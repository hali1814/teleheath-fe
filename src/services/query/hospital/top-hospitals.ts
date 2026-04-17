import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital } from '#/entities/hospitalEntity'
import type { ApiTopHospitals } from '#/dto/hospitalDto'

interface TopHospitalsRequest {
  country?: string
  size?: number
}

const getTopHospitals = async (
  params: TopHospitalsRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiTopHospitals>('/hospitals/top', params, {
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
