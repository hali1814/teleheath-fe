import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface CheckStatusPaymentRequest {
  refId: string
}

export type PaymentFailureEventType =
  | 'AMOUNT_MISMATCH'
  | 'OUT_SLOT'
  | 'DUPLICATE_CALLBACK'

export interface CheckStatusPaymentResponse {
  refId: string
  status: string
  attempt: number
  paidAt?: string | null
  appointmentId: string
  appointmentCode?: string
  appointmentStatus: string
  /** BE trả non-null khi payment_log gần nhất thuộc 1 trong 3 case cần show popup Payment Failed. */
  eventType?: PaymentFailureEventType | null
}

const checkStatusPayment = async (
  params: CheckStatusPaymentRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<CheckStatusPaymentResponse>(
    `/payments/${params.refId}/status`,
    undefined,
    { signal },
  )
  return response
}

export const useCheckStatusPaymentQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<CheckStatusPaymentResponse>,
    CheckStatusPaymentRequest
  >,
) => {
  return useQuery({
    queryKey: ['check-status-payment', options.params],
    queryFn: ({ signal }) => checkStatusPayment(options.params, signal),
    ...options,
  })
}
