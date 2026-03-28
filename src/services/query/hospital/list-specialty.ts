import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Specialty } from '#/types/specialty'

interface ListSpecialtyRequest {
  hospitalId?: string
  keyword?: string
  country?: 'VN' | 'KH'
}

const getListSpecialty = async (
  params: ListSpecialtyRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Specialty[]>(`/specialties`, params, {
    signal,
  })
  return response
}

export const useGetListSpecialtyQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<Specialty[]>,
    ListSpecialtyRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-specialty', options.params],
    queryFn: ({ signal }) => getListSpecialty(options.params, signal),
    ...options,
  })
}
