import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import {
  useCheckStatusPaymentQuery,
  type CheckStatusPaymentResponse,
} from '#/services/query/payment/check-status-payment'
import { useGenerateKhqrQuery } from '#/services/query/payment/generate-khqr'
import { useNavigate, useRouter } from '@tanstack/react-router'
import Image from '#/components/image'
import { Icon } from '#/components/icon'
import { formatPrice } from '#/utils/price.util'
import { useBookingStore } from '#/stores/booking-store'
import { useCallback } from 'react'

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

export function KhqrPaymentView({ bookingToken }: { bookingToken: string }) {
  const router = useRouter()
  const navigate = useNavigate()
  const { reset } = useBookingStore()
  const { data, isLoading, isError, refetch, isFetching } =
    useGenerateKhqrQuery({
      params: { bookingToken },
      enabled: !!bookingToken,
    })

  const khqr = data?.data

  const onCheckStatusSuccess = useCallback(
    ({ data }: { data: CheckStatusPaymentResponse }) => {
      if (!data) return
      if (khqr?.expiredAt && new Date(khqr.expiredAt) < new Date()) {
        router.history.back()
      }
      if (data.status === 'SUCCESS') {
        reset()
        navigate({
          to: '/app/book-appointment/success/$appointmentCode',
          params: { appointmentCode: data.appointmentCode },
        })
      }
    },
    [khqr, router, reset, navigate, data?.appointmentCode],
  )

  useCheckStatusPaymentQuery({
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
    onSuccess: onCheckStatusSuccess,
  })

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex flex-1 flex-col items-center gap-[16px] px-[16px] pb-[100px] pt-[40px]">
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
            <Image
              src={`data:image/png;base64,${khqr.qrImage}`}
              alt="KHQR Payment QR"
              className="h-[400px] w-[300px] object-cover"
            />

            <div className="flex flex-col items-center gap-[6px]">
              <Text className="font-semibold leading-[1.2] text-black">
                Scan to Pay
              </Text>
              <Text className="leading-[1.2] text-black">or</Text>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              <div className="flex justify-center items-center gap-[8px]">
                <Icon name="download" className="text-white" />
                <Text className="leading-[1.2] text-[#11BFC6]">
                  Download QR
                </Text>
              </div>
              <Text className="max-w-[230px] text-center text-[#808080] leading-normal">
                and upload to Mobile Banking app supporting KHQR
              </Text>
            </div>

            <div className="w-full flex flex-col gap-[14px] p-[16px]">
              <div className="flex justify-between items-center">
                <Text className="leading-normal text-[#282828]">Subtotal</Text>
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
                  TOTAL
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
                  Back
                </Text>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
