import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface DetailPaymentRequest {
  appointmentId: string
}

export interface DetailPaymentResponse {
  paymentId: string
  refId: string
  method: string
  attempt: number
  amount: number
  currency: string
  status: string
  transId: string | null
  transFee: number | null
  transAmount: number | null
  transTotalAmount: number | null
  paidAt: string | null
  createdAt: string
}

const getDetailPayment = async (
  params: DetailPaymentRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<DetailPaymentResponse>(
    `/payments/appointments/${params.appointmentId}/payment`,
    { signal },
  )
  return response
}

export const useGetDetailPaymentQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<DetailPaymentResponse>,
    DetailPaymentRequest
  >,
) => {
  return useQuery({
    queryKey: ['detail-payment', options.params],
    queryFn: ({ signal }) => getDetailPayment(options.params, signal),
    ...options,
  })
}
