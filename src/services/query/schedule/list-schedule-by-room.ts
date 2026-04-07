import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListScheduleByRoomRequest {
  roomId: number | string
  doctorId?: number
  date?: string
}

interface ScheduleDoctor {
  doctorId: number | string
  nameVi: string
  nameKh: string
  nameEn: string
  avatarUrl: string
}

interface ScheduleBranch {
  branchId: number | string
  nameVi: string
  nameEn: string
  address: string
}

interface ScheduleRoom {
  roomId: number | string
  roomCode: string
  name: string
  specialtyId: number
}

interface ScheduleSlot {
  startTime: string
  endTime: string
  status: string
  availableSlots: number
  doctors: ScheduleDoctor[]
}

export interface ListScheduleByRoomResponse {
  doctor: ScheduleDoctor
  branch: ScheduleBranch
  room: ScheduleRoom
  price: number
  morning: ScheduleSlot[]
  afternoon: ScheduleSlot[]
}

const getListScheduleByRoom = async (
  params: ListScheduleByRoomRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListScheduleByRoomResponse>(
    `/rooms/${params.roomId}/schedules`,
    {
      doctorId: params.doctorId,
      date: params.date,
    },
    {
      signal,
    },
  )
  return response
}

export const useGetListScheduleByRoomQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListScheduleByRoomResponse>,
    ListScheduleByRoomRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-schedule-by-room', options.params],
    queryFn: ({ signal }) => getListScheduleByRoom(options.params, signal),
    ...options,
  })
}
