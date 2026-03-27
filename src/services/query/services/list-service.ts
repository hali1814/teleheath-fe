import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListServiceRequest extends IPagingRequest {}

export interface ListServiceResponse {
  id: number
  name: string
  /** TipTap HTML persisted by backend */
  description: string
  iconUrl: string
  price: number
  currency: string
}

const getListService = async (
  params: ListServiceRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListServiceResponse[]>('/services', params, {
    signal,
  })
  return response
}

export const useGetListServiceQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListServiceResponse[]>,
    ListServiceRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-service', options.params],
    queryFn: ({ signal }) => getListService(options.params, signal),
    ...options,
  })
}
