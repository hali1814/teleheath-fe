import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital } from '#/types/hospital'

interface ListHospitalsRequest extends IPagingRequest {
  keyword?: string
  country?: string
}

export interface ListHospitalsResponse extends IPagingResponse<Hospital> {}

const getListHospitals = async (
  params: ListHospitalsRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListHospitalsResponse>('/hospitals', params, {
    signal,
  })
  return response
}

export const useGetListHospitalsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListHospitalsResponse>,
    ListHospitalsRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-hospitals', options.params],
    queryFn: ({ signal }) => getListHospitals(options.params, signal),
    ...options,
  })
}
