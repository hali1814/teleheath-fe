import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface MarkReadAllNotificationRequest {}

export const markReadAllNotification = async (
  params: MarkReadAllNotificationRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<void>> => {
  const response = await http.patch<void>('/notifications/read-all', params, {
    signal,
  })
  return response
}

export const useMarkReadAllNotificationMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<void>,
    MarkReadAllNotificationRequest,
    Error,
    unknown
  >,
) => {
  return useMutation({
    mutationFn: (
      variables: MarkReadAllNotificationRequest,
      signal: AbortSignal,
    ) => markReadAllNotification(variables, signal),
    mutationKey: ['mark-read-all-notification', 'list-notification'],
    ...options,
  })
}
