import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListScheduleByDoctorRequest {
  doctorId: number
  branchId?: number
  date?: string
}

interface ScheduleByDoctor {
  startTime: string
  endTime: string
  status: 'AVAILABLE' | 'FULL'
  availableSlots: number
  doctors: Array<{
    doctorId: string
    nameVi: string
  }>
}

export interface ListScheduleByDoctorResponse {
  morning: ScheduleByDoctor[]
  afternoon: ScheduleByDoctor[]
}

const getListScheduleByDoctor = async (
  params: ListScheduleByDoctorRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListScheduleByDoctorResponse>(
    `/doctors/${params.doctorId}/schedules`,
    {
      branchId: params.branchId,
      date: params.date,
    },
    {
      signal,
    },
  )
  return response
}

export const useGetListScheduleByDoctorQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListScheduleByDoctorResponse>,
    ListScheduleByDoctorRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-schedule-by-doctor', options.params],
    queryFn: ({ signal }) => getListScheduleByDoctor(options.params, signal),
    ...options,
  })
}
