import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Doctor } from '#/types/doctor'

interface DoctorDetailRequest {
  doctorId: string
}

const getDoctorDetail = async (
  params: DoctorDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Doctor>(`/doctors/${params.doctorId}`, {
    signal,
  })
  return response
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
