import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Package } from '#/types/package'

interface ListPackagesRequest extends IPagingRequest {
  country?: string
  hospital?: string
  price?: string
}

export interface ListPackagesResponse extends IPagingResponse<Package> {}

const getListPackages = async (
  params: ListPackagesRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListPackagesResponse>('/packages', params, {
    signal,
  })
  return response
}

export const useGetListPackagesQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListPackagesResponse>,
    ListPackagesRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-packages', options.params],
    queryFn: ({ signal }) => getListPackages(options.params, signal),
    ...options,
  })
}
