import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital } from '#/types/hospital'

interface TopHospitalsRequest {}

const getTopHospitals = async (
  params: TopHospitalsRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Hospital[]>('/hospitals/top', params, {
    signal,
  })
  return response
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
