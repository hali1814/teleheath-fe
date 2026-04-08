import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { ListDoctorResponse } from '../doctor/list-doctor'
import type { ListPackagesResponse } from '../package/list-packages'
import type { SearchResponse } from './search'
import type { Hospital as ApiHospital } from '#/types/hospital'
import type { Hospital } from '#/entities/hospitalEntity'
import { mapApiHospital } from '#/mappers/hospitalMapper'

interface SearchRequest {
  specialtyId: number
}

interface SearchSpecialtyApiResponse {
  hospitals: ApiHospital[]
  doctors: ListDoctorResponse[]
  packages: ListPackagesResponse[]
}

export interface SearchSpecialtyResponse {
  hospitals: Hospital[]
  doctors: ListDoctorResponse[]
  packages: ListPackagesResponse[]
}

const getSearchSpecialty = async (
  params: SearchRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<SearchSpecialtyApiResponse>(
    `/search/specialties/${params.specialtyId}`,
    params,
    {
      signal,
    },
  )

  const mappedHospitals = response.data.hospitals.map((hospital: ApiHospital) =>
    mapApiHospital(hospital),
  )

  return {
    ...response,
    data: {
      ...response.data,
      hospitals: mappedHospitals,
    },
  }
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
