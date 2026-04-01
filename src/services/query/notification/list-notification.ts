import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListNotificationRequest {
  statuses?: string
}

export interface ListNotificationResponse {
  notifId: string
  appointmentId: number
  title: string
  body: string
  iconUrl: string
  type: string
  channel: string
  status: string
  sentAt: string
  createdAt: string
}

const getListNotification = async (
  params: ListNotificationRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListNotificationResponse[]>(
    '/notifications',
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetListNotificationQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListNotificationResponse[]>,
    ListNotificationRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-notification', options.params],
    queryFn: ({ signal }) => getListNotification(options.params, signal),
    ...options,
  })
}
