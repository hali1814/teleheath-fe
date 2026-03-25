import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'

export interface AppointmentDetailsRequest {
  id: number
}

const getAppointmentDetails = async (
  params: AppointmentDetailsRequest,
  signal: AbortSignal,
) => {
  return http.get<MyAppointmentItem>(`/appointments/${params.id}`, {}, { signal })
}

export const useGetAppointmentDetailsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<MyAppointmentItem>,
    AppointmentDetailsRequest
  >,
) => {
  return useQuery({
    queryKey: ['appointment-details', options.params],
    queryFn: ({ signal }) => getAppointmentDetails(options.params, signal),
    ...options,
  })
}

