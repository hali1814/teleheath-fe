import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Branch } from '#/types/hospital'

interface ListBranchesRequest {
  hospitalId: string
}

const getListBranches = async (
  params: ListBranchesRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Branch[]>(
    `/hospitals/${params.hospitalId}/branches`,
    {},
    {
      signal,
      params,
    },
  )
  return response
}

export const useGetListBranchesQuery = (
  options: UseQueryOptions<HttpCommonResponse<Branch[]>, ListBranchesRequest>,
) => {
  return useQuery({
    queryKey: ['list-branches', options.params],
    queryFn: ({ signal }) => getListBranches(options.params, signal),
    ...options,
  })
}
