import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Partner } from '#/types/service'

interface ListPartnerRequest {
  serviceType?: 'TRANSPORT' | 'ACCOMMODATION'
}

const getListPartner = async (
  params: ListPartnerRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Partner[]>('/addon-partners', params, {
    signal,
  })
  return response
}

export const useGetListPartnerQuery = (
  options: UseQueryOptions<HttpCommonResponse<Partner[]>, ListPartnerRequest>,
) => {
  return useQuery({
    queryKey: ['list-partner', options.params],
    queryFn: ({ signal }) => getListPartner(options.params, signal),
    ...options,
  })
}
