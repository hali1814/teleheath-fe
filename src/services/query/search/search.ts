import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { ListHospitalsResponse } from '../hospital/list-hospitals'
import type { ListDoctorResponse } from '../doctor/list-doctor'
import type { ListPackagesResponse } from '../package/list-packages'

interface SearchRequest {
  keyword: string
  type: string
  specialtyId?: number
}

export interface SearchResponse {
  hospitals: ListHospitalsResponse[]
  doctors: ListDoctorResponse[]
  packages: ListPackagesResponse[]
}

const getSearch = async (params: SearchRequest, signal: AbortSignal) => {
  const response = await http.get<SearchResponse>(`/search`, params, {
    signal,
  })
  return response
}

export const useGetSearchQuery = (
  options: UseQueryOptions<HttpCommonResponse<SearchResponse>, SearchRequest>,
) => {
  return useQuery({
    queryKey: ['search', options.params],
    queryFn: ({ signal }) => getSearch(options.params, signal),
    ...options,
  })
}
