import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListBranchesRequest {
  hospitalId: string
}

export interface ListBranchesResponse {
  branchId: string
  hospitalId: string
  nameVi: string
  nameKh: string
  nameEn: string
  hotline: string
  email: string
  address: string
  lat: number
  lng: number
  workingHours: {
    day: string
    open: boolean
    openTime: string | null
    closeTime: string | null
  }[]
  status: 'ACTIVE' | 'INACTIVE' | string
}

const getListBranches = async (
  params: ListBranchesRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListBranchesResponse[]>(
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
  options: UseQueryOptions<
    HttpCommonResponse<ListBranchesResponse[]>,
    ListBranchesRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-branches', options.params],
    queryFn: ({ signal }) => getListBranches(options.params, signal),
    ...options,
  })
}
