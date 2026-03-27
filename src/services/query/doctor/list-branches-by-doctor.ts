import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Branch } from '#/types/hospital'

interface ListBranchesByDoctorRequest {
  doctorId: string
}

const getListBranchesByDoctor = async (
  params: ListBranchesByDoctorRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Branch[]>(
    `/doctors/${params.doctorId}/branches`,
    {},
    {
      signal,
      params,
    },
  )
  return response
}

export const useGetListBranchesByDoctorQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<Branch[]>,
    ListBranchesByDoctorRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-branches-by-doctor', options.params],
    queryFn: ({ signal }) => getListBranchesByDoctor(options.params, signal),
    ...options,
  })
}
