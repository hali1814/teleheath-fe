import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListHospitalsRequest extends IPagingRequest {}

interface WorkingHour {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
  open: boolean
  openTime: string | null
  closeTime: string | null
}

export interface ListHospitalsResponse extends IPagingResponse<{
  hospitalId: string
  nameVi: string
  nameKh: string | null
  nameEn: string
  country: string
  address: string
  lat: number
  lng: number
  thumbnailUrl: string | null
  workingHours: WorkingHour[]
  timezone: string
  status: 'ACTIVE' | 'INACTIVE' | string
  specialties: unknown[] | null
}> {}

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
