import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListServiceByBranchRequest {
  branchId: string
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

const getListServiceByBranch = async (
  params: ListServiceByBranchRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListServiceResponse[]>(
    `/branches/${params.branchId}/services`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetListServiceByBranchQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListServiceResponse[]>,
    ListServiceByBranchRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-service-by-branch', options.params],
    queryFn: ({ signal }) => getListServiceByBranch(options.params, signal),
    ...options,
  })
}
