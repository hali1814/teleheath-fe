import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface GenerateKhqrRequest {
  appointmentId: string
}

export interface GenerateKhqrResponse {
  refId: string
  qrCode: string
  amount: number
  currency: string
  expiredTime: number
  expiredAt: string
  attempt: number
}

const generateKhqr = async (
  params: GenerateKhqrRequest,
  signal: AbortSignal,
) => {
  const response = await http.post<GenerateKhqrResponse>(
    `/payments/generate-qr`,
    params,
    { signal },
  )
  return response
}

export const useGenerateKhqrQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<GenerateKhqrResponse>,
    GenerateKhqrRequest
  >,
) => {
  return useQuery({
    queryKey: ['generate-khqr', options.params],
    queryFn: ({ signal }) => generateKhqr(options.params, signal),
    ...options,
  })
}
