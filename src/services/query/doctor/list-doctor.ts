import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Doctor } from '#/types/doctor'

interface ListDoctorRequest extends IPagingRequest {
  country?: string
  /** ID chuyên khoa */
  specialty?: number
  gender?: string
  minExperience?: number
  maxExperience?: number
  consultationType?: string
  minPrice?: number
  maxPrice?: number
  keyword?: string
  topOnly?: boolean
}

export interface ListDoctorResponse extends IPagingResponse<Doctor> {}

const getListDoctor = async (
  params: ListDoctorRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListDoctorResponse>('/doctors', params, {
    signal,
  })
  return response
}

export const useGetListDoctorQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListDoctorResponse>,
    ListDoctorRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-doctor', options.params],
    queryFn: ({ signal }) => getListDoctor(options.params, signal),
    ...options,
  })
}
