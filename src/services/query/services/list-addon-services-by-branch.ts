import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListAddonServicesByBranchRequest {
  branchId: string | number
}

export interface AddonServiceByBranchResponse {
  id: number
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
}

const getListAddonServicesByBranch = async (
  params: ListAddonServicesByBranchRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<AddonServiceByBranchResponse[]>(
    `/branches/${params.branchId}/addon-services`,
    undefined,
    {
      signal,
    },
  )
  return response
}

export const useGetListAddonServicesByBranchQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<AddonServiceByBranchResponse[]>,
    ListAddonServicesByBranchRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-addon-services-by-branch', options.params],
    queryFn: ({ signal }) =>
      getListAddonServicesByBranch(options.params, signal),
    ...options,
  })
}
