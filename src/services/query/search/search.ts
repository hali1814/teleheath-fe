import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { HospitalDetailResponse } from '../hospital/hospital-detail'
import type { DoctorDetailResponse } from '../doctor/doctor-detail'
import type { PackageDetailResponse } from '../package/package-detail'

interface SearchRequest {
  keyword: string
  type: string
}

export interface SearchResponse {
  hospitals: HospitalDetailResponse[]
  doctors: DoctorDetailResponse[]
  packages: PackageDetailResponse[]
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
