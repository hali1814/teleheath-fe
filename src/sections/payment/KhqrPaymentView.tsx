import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import Header from '#/sections/home/Header'
import { useCheckStatusPaymentQuery } from '#/services/query/payment/check-status-payment'
import type { CheckStatusPaymentResponse } from '#/services/query/payment/check-status-payment'
import { useGenerateKhqrQuery } from '#/services/query/payment/generate-khqr'
import { cn } from '#/lib/utils'
import { formatDate, DATE_TIME_TYPE } from '#/utils/date.util'
import QRCode from 'react-qr-code'
import { useNavigate } from '@tanstack/react-router'

const POLL_INTERVAL_MS = 30_000

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

function isPaidStatus(status: string) {
  const s = status.trim().toUpperCase()
  return ['PAID', 'SUCCESS', 'COMPLETED'].includes(s)
}

export function KhqrPaymentView({ appointmentId }: { appointmentId: string }) {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch, isFetching } =
    useGenerateKhqrQuery({
      params: { appointmentId },
      enabled: !!appointmentId,
    })

  const khqr = data?.data

  const {
    data: statusResponse,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
    refetch: refetchStatus,
    isFetching: isFetchingStatus,
  } = useCheckStatusPaymentQuery({
    params: { refId: khqr?.refId ?? '' },
    enabled: !!khqr?.refId,
    /** Tránh toast lặp mỗi lần poll lỗi */
    isShowError: false,
    refetchInterval: (query) => {
      const payload = query.state.data?.data
      if (!payload) return POLL_INTERVAL_MS
      if (isTerminalPaymentStatus(payload.status)) return false
      return POLL_INTERVAL_MS
    },
    /** Vẫn poll khi chuyển tab (tuỳ nhu cầu bảo mật có thể đổi thành false). */
    refetchIntervalInBackground: true,
    onSuccess: (data) => {
      console.log(data)
      if (data.data?.status === 'SUCCESS') {
        navigate({
          to: '/app/book-appointment/success/$appointmentId',
          params: { appointmentId },
        })
      }
    },
  })

  const payment = statusResponse?.data
  const showStatusRow = !!khqr?.refId
  const isPaid = payment ? isPaidStatus(payment.status) : false
  const isFailed = payment
    ? isTerminalPaymentStatus(payment.status) && !isPaidStatus(payment.status)
    : false

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header isHome={false} title="KHQR payment" />

      <div className="flex flex-1 flex-col items-center px-[16px] pb-[32px] pt-[24px]">
        {isLoading || isFetching ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
            <Spinner className="h-8 w-8 text-primary" />
            <Text className="text-muted-foreground">Generating QR…</Text>
          </div>
        ) : isError || !khqr ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[16px]">
            <Text className="text-center text-muted-foreground">
              Could not load payment QR. Please try again.
            </Text>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              onClick={() => void refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            {showStatusRow && (
              <PaymentStatusBanner
                payment={payment}
                isLoadingStatus={isLoadingStatus}
                isErrorStatus={isErrorStatus}
                isFetchingStatus={isFetchingStatus}
                onRetry={() => void refetchStatus()}
                isPaid={isPaid}
                isFailed={isFailed}
              />
            )}

            <div className="flex w-full max-w-[320px] flex-col items-center gap-[8px] rounded-[16px] border border-[#F2F2F2] bg-white px-[20px] py-[24px] shadow-sm">
              <Text
                size="sm_12"
                className="font-medium uppercase tracking-wide text-muted-foreground"
              >
                Scan to pay
              </Text>
              <div
                className={cn(
                  'rounded-[12px] bg-white p-[12px]',
                  'ring-1 ring-[#F2F2F2]',
                )}
              >
                <QRCode
                  value={khqr.qrCode}
                  size={220}
                  level="M"
                  className="h-auto max-w-full"
                />
              </div>
              <Text size="sm_12" className="text-center text-muted-foreground">
                Open your banking app and scan this code
              </Text>
            </div>

            <div className="mt-[28px] flex w-full max-w-[320px] flex-col gap-[12px] rounded-[12px] bg-dust-red-1/50 px-[16px] py-[14px]">
              <Row label="Amount">
                <Text className="font-semibold text-[#333333]">
                  {khqr.amount.toLocaleString()} {khqr.currency}
                </Text>
              </Row>
              <Row label="Reference">
                <Text className="font-mono text-sm text-[#333333] break-all">
                  {khqr.refId}
                </Text>
              </Row>
              <Row label="Expires">
                <Text className="text-[#333333]">
                  {formatDate(
                    khqr.expiredAt,
                    DATE_TIME_TYPE.YYYY_MM_DD_HH_mm_ss,
                  )}
                </Text>
              </Row>
              {khqr.expiredTime > 0 && (
                <Text size="sm_12" className="text-muted-foreground">
                  Valid for {khqr.expiredTime} minutes from generation
                </Text>
              )}
            </div>

            {showStatusRow && !isPaid && !isFailed && (
              <Text
                size="sm_12"
                className="mt-[16px] max-w-[320px] text-center text-muted-foreground"
              >
                Checking payment every {POLL_INTERVAL_MS / 1000}s…
              </Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function PaymentStatusBanner({
  payment,
  isLoadingStatus,
  isErrorStatus,
  isFetchingStatus,
  onRetry,
  isPaid,
  isFailed,
}: {
  payment: CheckStatusPaymentResponse | undefined
  isLoadingStatus: boolean
  isErrorStatus: boolean
  isFetchingStatus: boolean
  onRetry: () => void
  isPaid: boolean
  isFailed: boolean
}) {
  if (isLoadingStatus && !payment) {
    return (
      <div className="mb-[20px] flex w-full max-w-[320px] items-center justify-center gap-[10px] rounded-[12px] border border-[#F2F2F2] bg-white px-[14px] py-[12px]">
        <Spinner className="h-4 w-4 text-primary" />
        <Text size="sm_12" className="text-muted-foreground">
          Checking payment status…
        </Text>
      </div>
    )
  }

  if (isErrorStatus && !payment) {
    return (
      <div className="mb-[20px] flex w-full max-w-[320px] flex-col items-center gap-[10px] rounded-[12px] border border-destructive/30 bg-destructive/5 px-[14px] py-[12px]">
        <Text size="sm_12" className="text-center text-destructive">
          Could not check payment status.
        </Text>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={onRetry}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (!payment) return null

  return (
    <div
      className={cn(
        'mb-[20px] flex w-full max-w-[320px] flex-col gap-[6px] rounded-[12px] border px-[14px] py-[12px]',
        isPaid && 'border-emerald-200 bg-emerald-50',
        isFailed && !isPaid && 'border-destructive/30 bg-destructive/5',
        !isPaid && !isFailed && 'border-[#F2F2F2] bg-white',
      )}
    >
      <div className="flex items-center justify-between gap-[8px]">
        <Text size="sm_12" className="font-medium text-muted-foreground">
          Payment status
        </Text>
        {isFetchingStatus && !isPaid && !isFailed && (
          <Spinner className="h-3.5 w-3.5 text-primary" />
        )}
      </div>
      <Text
        className={cn(
          'font-semibold capitalize',
          isPaid && 'text-emerald-800',
          isFailed && !isPaid && 'text-destructive',
          !isPaid && !isFailed && 'text-[#333333]',
        )}
      >
        {payment.status.replace(/_/g, ' ').toLowerCase()}
      </Text>
      {payment.paidAt && (
        <Text size="sm_12" className="text-muted-foreground">
          Paid at{' '}
          {formatDate(payment.paidAt, DATE_TIME_TYPE.YYYY_MM_DD_HH_mm_ss)}
        </Text>
      )}
      {payment.appointmentStatus && (
        <Text size="sm_12" className="text-muted-foreground">
          Appointment: {payment.appointmentStatus}
        </Text>
      )}
    </div>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <Text size="sm_12" className="text-muted-foreground">
        {label}
      </Text>
      {children}
    </div>
  )
}
