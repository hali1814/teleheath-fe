import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface DoctorDetailRequest {
  doctorId: string
}

interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  email: string
  website: string
}

export interface DoctorDetailResponse {
  doctorId: string
  branchId: string
  hospitalId: string
  avatarUrl: string
  nameVi: string
  nameKh: string
  nameEn: string
  gender: string
  bioVi: string
  bioKh: string
  bioEn: string
  experienceYears: number
  consultationType: string
  consultationFee: number
  certifications: string
  specialties: {
    id: string
    name: string
    description: string
    iconUrl: string
  }[]
}

const getDoctorDetail = async (
  params: DoctorDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<DoctorDetailResponse>(
    `/doctors/${params.doctorId}`,
    { signal },
  )
  return response
}

export const useGetDoctorDetailQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<DoctorDetailResponse>,
    DoctorDetailRequest
  >,
) => {
  return useQuery({
    queryKey: ['doctor-detail', options.params],
    queryFn: ({ signal }) => getDoctorDetail(options.params, signal),
    ...options,
  })
}
