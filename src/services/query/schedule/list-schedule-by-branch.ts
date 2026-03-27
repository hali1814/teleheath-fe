import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListScheduleByBranchRequest {
  branchId: string
  specialtyId?: number
  /** Query param `date` — yyyy-MM-dd */
  date?: string
}

interface ScheduleByBranch {
  startTime: string
  endTime: string
  status: 'AVAILABLE' | 'FULL'
  availableSlots: number
  doctors: Array<{
    doctorId: string
    nameVi: string
  }>
}

export interface ListScheduleByBranchResponse {
  morning: ScheduleByBranch[]
  afternoon: ScheduleByBranch[]
}

const getListScheduleByBranch = async (
  params: ListScheduleByBranchRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListScheduleByBranchResponse>(
    `/branches/${params.branchId}/schedules`,
    {
      specialtyId: params.specialtyId,
      date: params.date,
    },
    {
      signal,
    },
  )
  return response
}

export const useGetListScheduleByBranchQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListScheduleByBranchResponse>,
    ListScheduleByBranchRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-schedule-by-branch', options.params],
    queryFn: ({ signal }) => getListScheduleByBranch(options.params, signal),
    ...options,
  })
}
