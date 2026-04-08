import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital as ApiHospital } from '#/types/hospital'
import type { Hospital } from '#/entities/hospitalEntity'

interface TopHospitalsRequest {
  country?: string
}

const getTopHospitals = async (
  params: TopHospitalsRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiHospital[]>('/hospitals/top', params, {
    signal,
  })

  const mappedData = response.data.map((hospital) => mapApiHospital(hospital))

  return {
    ...response,
    data: mappedData,
  }
}

export const useGetTopHospitalsQuery = (
  options: UseQueryOptions<HttpCommonResponse<Hospital[]>, TopHospitalsRequest>,
) => {
  return useQuery({
    queryKey: ['top-hospitals', options.params],
    queryFn: ({ signal }) => getTopHospitals(options.params, signal),
    ...options,
  })
}
