import type { ApiDoctorList } from '#/dto/doctorDto'
import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiDoctor } from '#/mappers/doctorMapper'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import type { Doctor } from '#/entities/doctorEntity'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListDoctorRequest extends IPagingRequest {
  country?: string
  hospitalId?: string
  /** ID chuyên khoa */
  specialtyId?: number
  gender?: string
  minExperience?: number
  maxExperience?: number
  minPrice?: number
  maxPrice?: number
  keyword?: string
  topOnly?: boolean
}

const getListDoctor = async (
  params: ListDoctorRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiDoctorList>('/doctors', params, {
    signal,
  })

  const mappedData = response.data.content.map((api) => mapApiDoctor(api))

  return {
    ...response,
    data: {
      ...response.data,
      content: mappedData,
    },
  }
}

export const useGetListDoctorQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<IPagingResponse<Doctor>>,
    ListDoctorRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-doctor', options.params],
    queryFn: ({ signal }) => getListDoctor(options.params, signal),
    ...options,
  })
}
