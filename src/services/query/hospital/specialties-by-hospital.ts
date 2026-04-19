import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Specialty } from '#/types/specialty'

interface SpecialtiesByHospitalRequest {
  hospitalId: string
  keyword?: string
  hasRoomAvailable?: boolean
}

const getSpecialtiesByHospital = async (
  params: SpecialtiesByHospitalRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Specialty[]>(
    `/hospitals/${params.hospitalId}/specialties`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetSpecialtiesByHospitalQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<Specialty[]>,
    SpecialtiesByHospitalRequest
  >,
) => {
  return useQuery({
    queryKey: ['specialties-by-hospital', options.params],
    queryFn: ({ signal }) => getSpecialtiesByHospital(options.params, signal),
    ...options,
  })
}
