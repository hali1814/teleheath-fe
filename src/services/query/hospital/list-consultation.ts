import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListConsultationRequest {
  hospitalId: string
}

export interface ListConsultationResponse {
  id: number
  code: string
  nameVi: string
  nameEn: string
  description: string
  features: string[]
  surchargeAmount: number
}

const getListConsultations = async (
  params: ListConsultationRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListConsultationResponse[]>(
    `/hospitals/${params.hospitalId}/consultation-tiers`,
    {},
    {
      signal,
      params,
    },
  )
  return response
}

export const useGetListConsultationsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListConsultationResponse[]>,
    ListConsultationRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-consultations', options.params],
    queryFn: ({ signal }) => getListConsultations(options.params, signal),
    ...options,
  })
}
