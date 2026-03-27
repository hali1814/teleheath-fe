import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListScheduleByDoctorRequest {
  doctorId: string
  branchId?: string
  date?: string
}

interface ScheduleByDoctor {
  doctorId: string
  doctorName: string
  doctorAvatarUrl: string
  scheduleDate: string
  startTime: string
  endTime: string
  status: 'AVAILABLE' | 'FULL'
  price: number
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
