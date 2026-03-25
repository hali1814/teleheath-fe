import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { ConsultationTier } from '#/types/consultationTier'

interface ListConsultationRequest {
  hospitalId: string
}

const getListConsultations = async (
  params: ListConsultationRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ConsultationTier[]>(
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
    HttpCommonResponse<ConsultationTier[]>,
    ListConsultationRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-consultations', options.params],
    queryFn: ({ signal }) => getListConsultations(options.params, signal),
    ...options,
  })
}
