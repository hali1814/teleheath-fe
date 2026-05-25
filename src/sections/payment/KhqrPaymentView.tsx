import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Spinner } from '#/components/ui/spinner'
import {
  useCheckStatusPaymentQuery,
  type CheckStatusPaymentResponse,
  type PaymentFailureEventType,
} from '#/services/query/payment/check-status-payment'
import { PaymentFailedDialog } from '#/sections/payment/PaymentFailedDialog'
import { useGenerateKhqrQuery } from '#/services/query/payment/generate-khqr'
import { useNavigate, useRouter } from '@tanstack/react-router'
import Image from '#/components/image'
import { Icon } from '#/components/icon'
import { formatPrice } from '#/utils/price.util'
import { downloadImage } from '#/utils/auth'
import { useBookingStore } from '#/stores/booking-store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { XIcon } from 'lucide-react'
import { toast } from 'sonner'

const POLL_INTERVAL_MS = 10_000

/** Dừng poll khi backend trả trạng thái kết thúc (điều chỉnh theo API thực tế). */
function isTerminalPaymentStatus(status: string) {
  const s = status.trim().toUpperCase()
  return [
    'PAID',
    'SUCCESS',
    'COMPLETED',
    'FAILED',
    'EXPIRED',
    'CANCELLED',
    'REFUNDED',
  ].includes(s)
}

function QrExpiredWarningGraphic() {
  return (
    <div
      className="relative mx-auto mb-1 flex h-[100px] w-full max-w-[220px] items-center justify-center"
      aria-hidden
    >
      <span className="absolute left-[6%] top-0 text-xl font-light text-red-200">
        ×
      </span>
      <span className="absolute right-[8%] top-3 text-sm text-red-200">×</span>
      <span className="absolute bottom-2 left-[18%] text-lg text-red-200">
        ×
      </span>
      <span className="absolute bottom-4 right-[14%] text-xs text-red-200">
        ×
      </span>
      <span className="absolute left-[28%] top-6 text-[10px] text-red-100">
        ×
      </span>
      <svg
        className="relative z-10 h-[76px] w-[76px] shrink-0 text-[#EF4444]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.002 4.5-2.599 4.5H4.645c-1.597 0-3.753-2.5-2.599-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

export function KhqrPaymentView({ bookingToken }: { bookingToken: string }) {
  const { t } = useTranslation(['payment'])
  const router = useRouter()
  const navigate = useNavigate()
  const { reset } = useBookingStore()
  const { data, isLoading, isError, refetch, isFetching } =
    useGenerateKhqrQuery({
      params: { bookingToken },
      enabled: !!bookingToken,
    })

  const khqr = data?.data
  const [stopPaymentPoll, setStopPaymentPoll] = useState(false)
  const [qrExpiredDialogOpen, setQrExpiredDialogOpen] = useState(false)
  const [paymentFailedReason, setPaymentFailedReason] =
    useState<PaymentFailureEventType | null>(null)
  const qrExpiredDialogGateRef = useRef(false)
  const [remainingMs, setRemainingMs] = useState<number | null>(null)

  useEffect(() => {
    qrExpiredDialogGateRef.current = false
    setStopPaymentPoll(false)
    setQrExpiredDialogOpen(false)
    setPaymentFailedReason(null)
  }, [bookingToken])

  useEffect(() => {
    if (!khqr?.expiredAt) {
      setRemainingMs(null)
      return
    }
    const expiredAtMs = new Date(khqr.expiredAt).getTime()
    const tick = () => {
      const diff = expiredAtMs - Date.now()
      setRemainingMs(diff > 0 ? diff : 0)
    }
    tick()
    const intervalId = window.setInterval(tick, 1000)
    return () => window.clearInterval(intervalId)
  }, [khqr?.expiredAt])

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000))
    const mm = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0')
    const ss = (totalSeconds % 60).toString().padStart(2, '0')
    return `${mm}:${ss}`
  }

  const openQrExpiredDialog = useCallback(() => {
    if (qrExpiredDialogGateRef.current) return
    qrExpiredDialogGateRef.current = true
    setStopPaymentPoll(true)
    setQrExpiredDialogOpen(true)
  }, [])

  const handleQrExpiredClose = useCallback(() => {
    setQrExpiredDialogOpen(false)
    reset()
    router.history.back()
  }, [router, reset])

  useEffect(() => {
    if (!khqr?.expiredAt) return

    const runIfExpired = () => {
      if (new Date(khqr.expiredAt) <= new Date()) {
        openQrExpiredDialog()
      }
    }

    runIfExpired()

    const ms = new Date(khqr.expiredAt).getTime() - Date.now()
    if (ms <= 0) return

    const timerId = window.setTimeout(() => {
      openQrExpiredDialog()
    }, ms)

    return () => window.clearTimeout(timerId)
  }, [khqr?.expiredAt, openQrExpiredDialog])

  const onCheckStatusSuccess = useCallback(
    ({ data }: { data: CheckStatusPaymentResponse }) => {
      if (!data) return

      // Ưu tiên 1: BE báo 1 trong 3 event_type cần show popup Payment Failed
      // (AMOUNT_MISMATCH, OUT_SLOT, DUPLICATE_CALLBACK) — không chờ expired.
      // Đóng cổng QR Expired để timer setTimeout (chạy độc lập với polling) không
      // mở popup expired chồng lên popup Payment Failed khi tới expiredAt.
      if (data.eventType) {
        qrExpiredDialogGateRef.current = true
        setStopPaymentPoll(true)
        setPaymentFailedReason(data.eventType)
        return
      }

      // Ưu tiên 2: QR đã hết hạn theo timer client
      if (khqr?.expiredAt && new Date(khqr.expiredAt) <= new Date()) {
        openQrExpiredDialog()
        return
      }

      // Ưu tiên 3: thanh toán thành công
      if (data.status === 'SUCCESS') {
        if (!data.appointmentCode) return
        reset()
        navigate({
          to: '/app/book-appointment/success/$appointmentCode',
          params: { appointmentCode: data.appointmentCode },
        })
      }
    },
    [khqr?.expiredAt, openQrExpiredDialog, reset, navigate],
  )

  const handlePaymentFailedClose = useCallback(() => {
    setPaymentFailedReason(null)
    reset()
    router.history.back()
  }, [router, reset])

  const handleDownloadQr = useCallback(() => {
    if (!khqr?.qrImage) return

    try {
      downloadImage(khqr.qrImage)
      toast.success(t('downloadQrSuccess'))
    } catch {
      toast.error(t('downloadQrError'))
    }
  }, [khqr?.qrImage, t])

  useCheckStatusPaymentQuery({
    params: { refId: khqr?.refId ?? '' },
    enabled: !!khqr?.refId && !stopPaymentPoll,
    /** Tránh toast lặp mỗi lần poll lỗi */
    isShowError: false,
    refetchInterval: (query) => {
      const payload = query.state.data?.data
      if (!payload) return POLL_INTERVAL_MS
      if (isTerminalPaymentStatus(payload.status)) return false
      return POLL_INTERVAL_MS
    },
    onSuccess: onCheckStatusSuccess,
  })

  return (
    <>
      <PaymentFailedDialog
        open={!!paymentFailedReason}
        onClose={handlePaymentFailedClose}
      />
      <Dialog open={qrExpiredDialogOpen} onOpenChange={() => {}}>
        <DialogContent
          showCloseButton={false}
          className="gap-0 overflow-hidden rounded-[24px] p-0 sm:max-w-[min(calc(100%-2rem),360px)]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {/** Inner relative so X positions to card; avoid `relative` on Content (overrides dialog `fixed`). */}
          <div className="relative">
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={handleQrExpiredClose}
              aria-label={t('qrExpiredClose')}
            >
              <XIcon className="size-5" />
            </button>

            <div className="flex flex-col items-center px-6 pb-2 pt-14 text-center">
              <QrExpiredWarningGraphic />
              <DialogHeader className="w-full space-y-0 text-center">
                <DialogTitle className="text-lg font-semibold leading-snug tracking-tight text-[#282828]">
                  {t('qrExpiredModalTitle')}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="mt-3 max-w-[300px] px-0.5 text-center text-sm leading-relaxed text-[#808080] whitespace-pre-line">
                {t('qrExpiredModalDescription')}
              </DialogDescription>
            </div>

            <div className="px-6 pb-6 pt-5">
              <Button
                type="button"
                variant="default"
                className="h-[48px] w-full rounded-full text-base font-medium shadow-sm"
                onClick={handleQrExpiredClose}
              >
                {t('qrExpiredClose')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex min-h-dvh flex-col bg-background">
        <div className="flex flex-1 flex-col items-center gap-[16px] px-[16px] pb-[100px] pt-[40px]">
        {isLoading || isFetching ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
            <Spinner className="h-8 w-8 text-primary" />
            <Text className="text-muted-foreground">{t('generatingQr')}</Text>
          </div>
        ) : isError || !khqr ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
            <Text className="text-center text-muted-foreground">
              {t('loadQrError')}
            </Text>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              onClick={() => void refetch()}
            >
              {t('retry')}
            </Button>
          </div>
        ) : (
          <>
            {remainingMs !== null && (
              <div className="flex flex-col items-center gap-[4px]">
                <Text className="text-sm text-[#808080]">
                  {t('qrExpiresIn')}
                </Text>
                <Text
                  size="lg_16"
                  className={`font-semibold leading-[1.2] tabular-nums ${
                    remainingMs <= 60_000 ? 'text-[#EF4444]' : 'text-[#11BFC6]'
                  }`}
                >
                  {formatCountdown(remainingMs)}
                </Text>
              </div>
            )}
            <Image
              src={`data:image/png;base64,${khqr.qrImage}`}
              alt={t('khqrQrAlt')}
              className="h-[400px] w-[300px] object-cover"
            />

            <div className="flex flex-col items-center gap-[6px]">
              <Text className="font-semibold leading-[1.2] text-black">
                {t('scanToPay')}
              </Text>
              <Text className="leading-[1.2] text-black">{t('or')}</Text>
            </div>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="flex flex-col items-center gap-[8px]"
            >
              <div className="flex justify-center items-center gap-[8px]">
                <Icon name="download" className="text-white" />
                <Text className="leading-[1.2] text-[#11BFC6]">
                  {t('downloadQr')}
                </Text>
              </div>
              <Text className="max-w-[230px] text-center text-[#808080] leading-normal">
                {t('khqrMobileBankingHint')}
              </Text>
            </button>

            <div className="w-full flex flex-col gap-[14px] p-[16px]">
              <div className="flex justify-between items-center">
                <Text className="leading-normal text-[#282828]">
                  {t('subtotal')}
                </Text>
                <Text className="leading-normal text-[#282828]">
                  {formatPrice(khqr.amount, true)} {khqr.currency}
                </Text>
              </div>
              <div className="my-[10px] border-t-[1.5px] border-dashed border-[#DBDBDE]" />
              <div className="flex justify-between items-center">
                <Text
                  size="lg_16"
                  className="font-semibold leading-[1.2] text-[#282828]"
                >
                  {t('total')}
                </Text>
                <Text
                  size="lg_16"
                  className="font-semibold leading-[1.2] text-[#282828]"
                >
                  {formatPrice(khqr.amount, true)} {khqr.currency}
                </Text>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 px-[20px] pb-[35px] pt-[10px] bg-background">
              <Button
                onClick={() => router.history.back()}
                variant="outline"
                className="h-[45px] w-full border-primary text-primary rounded-[40px]"
              >
                <Text className="font-medium leading-normal text-primary">
                  {t('back')}
                </Text>
              </Button>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  )
}
