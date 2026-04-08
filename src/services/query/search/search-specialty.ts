import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital } from '#/entities/hospitalEntity'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import type { ApiDoctor } from '#/dto/doctorDto'
import type { ApiPackage } from '#/dto/packageDto'
import { mapApiDoctor } from '#/mappers/doctorMapper'
import { mapApiPackage } from '#/mappers/packageMapper'
import type { ApiHospital } from '#/dto/hospitalDto'
import type { Doctor } from '#/entities/doctorEntity'
import type { Package } from '#/entities/packageEntity'

interface SearchRequest {
  specialtyId: number
}

interface SearchSpecialtyApiResponse {
  hospitals: ApiHospital[]
  doctors: ApiDoctor[]
  packages: ApiPackage[]
}

export interface SearchSpecialtyResponse {
  hospitals: Hospital[]
  doctors: Doctor[]
  packages: Package[]
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

export const useGetSearchSpecialtyQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<SearchSpecialtyResponse>,
    SearchRequest
  >,
) => {
  return useQuery({
    queryKey: ['search-specialty', options.params],
    queryFn: ({ signal }) => getSearchSpecialty(options.params, signal),
    ...options,
  })
}
