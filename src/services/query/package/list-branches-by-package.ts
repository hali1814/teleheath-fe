import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Branch } from '#/types/hospital'

interface ListBranchesByPackageRequest {
  packageId: number
}

const getListBranchesByPackage = async (
  params: ListBranchesByPackageRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Branch[]>(
    `/packages/${params.packageId}/branches`,
    {},
    {
      signal,
    },
  )
  return response
}

export const useGetListBranchesByPackageQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<Branch[]>,
    ListBranchesByPackageRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-branches-by-package', options.params],
    queryFn: ({ signal }) => getListBranchesByPackage(options.params, signal),
    ...options,
  })
}
