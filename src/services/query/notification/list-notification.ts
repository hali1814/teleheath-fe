import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export type NotificationStatus = 'QUEUED' | 'DELIVERED' | 'READ'

export interface ListNotificationRequest {
  /**
   * Optional statuses filter. Backend accepts comma-separated values, e.g.
   * `READ,DELIVERED`.
   */
  statuses?: NotificationStatus | NotificationStatus[]
}

export interface ListNotificationResponse {
  notifId: string
  appointmentId: number
  title: string
  body: string
  titleVi?: string
  bodyVi?: string
  titleKh?: string
  bodyKh?: string
  iconUrl: string
  type: string
  eventCode: string
  channel: string
  language: string
  status: string
  sentAt: string
  deliveredAt: string
  createdAt: string
}

function normalizeNotificationParams(params: ListNotificationRequest): {
  statuses?: string
} {
  if (Array.isArray(params.statuses)) {
    return {
      ...params,
      statuses:
        params.statuses.length > 0 ? params.statuses.join(',') : undefined,
    }
  }

  return {
    statuses: params.statuses,
  }
}

const getListNotification = async (
  params: ListNotificationRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListNotificationResponse[]>(
    '/notifications',
    normalizeNotificationParams(params),
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
