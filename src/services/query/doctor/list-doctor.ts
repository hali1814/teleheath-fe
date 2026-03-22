import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListDoctorRequest extends IPagingRequest {}

interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  email: string
  website: string
}

export interface ListDoctorResponse {
  id: number
  name: string
  description: string
  category: string
  price: number
  durationMinutes: number
  imageUrl: string
  hospitals: Hospital[]
  active: boolean
}

const getListDoctor = async (
  params: ListDoctorRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListDoctorResponse[]>('/doctors', params, {
    signal,
  })
  return response
}

export const useGetListDoctorQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListDoctorResponse[]>,
    ListDoctorRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-doctor', options.params],
    queryFn: ({ signal }) => getListDoctor(options.params, signal),
    ...options,
  })
}
