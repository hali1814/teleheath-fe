import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import type { Hospital } from '#/entities/hospitalEntity'
import { mapApiDoctor } from '#/mappers/doctorMapper'
import type { ApiDoctor } from '#/dto/doctorDto'
import type { ApiPackage } from '#/dto/packageDto'
import { mapApiPackage } from '#/mappers/packageMapper'
import type { Package } from '#/entities/packageEntity'
import type { Doctor } from '#/entities/doctorEntity'
import type { ApiHospital } from '#/dto/hospitalDto'

interface SearchRequest {
  keyword: string
  type: string
  specialtyId?: number
  hasRoomAvailable?: boolean
}

export interface SearchResponse {
  hospitals: Hospital[]
  doctors: Doctor[]
  packages: Package[]
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

  const mappedDoctors = response.data.doctors.map((doctor: ApiDoctor) =>
    mapApiDoctor(doctor),
  )

  const mappedPackages = response.data.packages.map((packageItem: ApiPackage) =>
    mapApiPackage(packageItem),
  )

  return {
    ...response,
    data: {
      ...response.data,
      hospitals: mappedHospitals,
      doctors: mappedDoctors,
      packages: mappedPackages,
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
