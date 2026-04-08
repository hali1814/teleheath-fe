import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListScheduleByPackageRequest {
  packageId: number
  branchId: number
  date?: string
}

interface ScheduleByPackage {
  startTime: string
  endTime: string
  status: 'AVAILABLE' | 'FULL'
  availableSlots: number
  doctors: Array<{
    doctorId: string
    nameVi: string
  }>
}

export interface ListScheduleByPackageResponse {
  morning: ScheduleByPackage[]
  afternoon: ScheduleByPackage[]
}

const getListScheduleByPackage = async (
  params: ListScheduleByPackageRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListScheduleByPackageResponse>(
    `/packages/${params.packageId}/schedules`,
    {
      date: params.date,
      branchId: params.branchId,
    },
    {
      signal,
    },
  )
  return response
}

export const useGetListScheduleByPackageQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListScheduleByPackageResponse>,
    ListScheduleByPackageRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-schedule-by-package', options.params],
    queryFn: ({ signal }) => getListScheduleByPackage(options.params, signal),
    ...options,
  })
}
