import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface HospitalDetailRequest {
  hospitalId: string
}

interface WorkingHour {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
  open: boolean
  openTime: string | null
  closeTime: string | null
}

export interface Specialty {
  id: string
  name: string
  description: string
  iconUrl: string
}

export interface HospitalDetailResponse {
  hospitalId: string
  nameVi: string
  nameKh: string | null
  nameEn: string
  country: string
  address: string
  lat: number
  lng: number
  thumbnailUrl: string | null
  logoUrl: string | null
  website: string | null
  description: string | null
  gallery: string[]
  workingHours: WorkingHour[]
  timezone: string
  status: 'ACTIVE' | 'INACTIVE' | string
  specialties: Specialty[] | null
}

const getHospitalDetail = async (
  params: HospitalDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<HospitalDetailResponse>(
    `/hospitals/${params.hospitalId}`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetHospitalDetailQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<HospitalDetailResponse>,
    HospitalDetailRequest
  >,
) => {
  return useQuery({
    queryKey: ['hospital-detail', options.params],
    queryFn: ({ signal }) => getHospitalDetail(options.params, signal),
    ...options,
  })
}
