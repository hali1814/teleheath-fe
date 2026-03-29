import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListServiceByPackageRequest {
  packageId: number
}

export interface ListServiceResponse {
  id: number
  name: string
  /** TipTap HTML persisted by backend */
  description: string
  iconUrl: string
  price: number
  currency: string
}

const getListServiceByPackage = async (
  params: ListServiceByPackageRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListServiceResponse[]>(
    `/packages/${params.packageId}/services`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetListServiceByPackageQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListServiceResponse[]>,
    ListServiceByPackageRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-service-by-package', options.params],
    queryFn: ({ signal }) => getListServiceByPackage(options.params, signal),
    ...options,
  })
}
