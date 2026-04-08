import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import type { Hospital as ApiHospital } from '#/types/hospital'
import type { Hospital } from '#/entities/hospitalEntity'
import type { Doctor as ApiDoctor } from '#/types/doctor'
import type { Package as ApiPackage } from '#/types/package'

interface SearchRequest {
  keyword: string
  type: string
  specialtyId?: number
}

export interface SearchResponse {
  hospitals: Hospital[]
  doctors: ApiDoctor[]
  packages: ApiPackage[]
}

interface SearchApiResponse {
  hospitals: ApiHospital[]
  doctors: ApiDoctor[]
  packages: ApiPackage[]
}

const getSearch = async (params: SearchRequest, signal: AbortSignal) => {
  const response = await http.get<SearchApiResponse>(`/search`, params, {
    signal,
  })

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

export const useGetSearchQuery = (
  options: UseQueryOptions<HttpCommonResponse<SearchResponse>, SearchRequest>,
) => {
  return useQuery({
    queryKey: ['search', options.params],
    queryFn: ({ signal }) => getSearch(options.params, signal),
    ...options,
  })
}
