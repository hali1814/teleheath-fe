import type { ApiDoctor } from '#/dto/doctorDto'
import type { Doctor } from '#/entities/doctorEntity'
import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiDoctor } from '#/mappers/doctorMapper'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface DoctorDetailRequest {
  doctorId: string
}

const getDoctorDetail = async (
  params: DoctorDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiDoctor>(`/doctors/${params.doctorId}`, {
    signal,
  })

  const mappedData = mapApiDoctor(response.data)

  return {
    ...response,
    data: mappedData,
  }
}

export const useGetDoctorDetailQuery = (
  options: UseQueryOptions<HttpCommonResponse<Doctor>, DoctorDetailRequest>,
) => {
  return useQuery({
    queryKey: ['doctor-detail', options.params],
    queryFn: ({ signal }) => getDoctorDetail(options.params, signal),
    ...options,
  })
}
