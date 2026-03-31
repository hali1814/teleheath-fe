import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { ListHospitalsResponse } from '../hospital/list-hospitals'
import type { ListDoctorResponse } from '../doctor/list-doctor'
import type { ListPackagesResponse } from '../package/list-packages'
import type { SearchResponse } from './search'

interface SearchRequest {
  specialtyId: number
}

export interface SearchSpecialtyResponse {
  hospitals: ListHospitalsResponse[]
  doctors: ListDoctorResponse[]
  packages: ListPackagesResponse[]
}

const getSearchSpecialty = async (
  params: SearchRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<SearchSpecialtyResponse>(
    `/search/specialties/${params.specialtyId}`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetSearchSpecialtyQuery = (
  options: UseQueryOptions<HttpCommonResponse<SearchResponse>, SearchRequest>,
) => {
  return useQuery({
    queryKey: ['search-specialty', options.params],
    queryFn: ({ signal }) => getSearchSpecialty(options.params, signal),
    ...options,
  })
}
