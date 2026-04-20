import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface MarkReadNotificationRequest {
  notifId: string
}

export const markReadNotification = async (
  params: MarkReadNotificationRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<void>> => {
  const response = await http.patch<void>(
    `/notifications/${params.notifId}/read`,
    {},
    {
      signal,
    },
  )
  return response
}

export const useMarkReadNotificationMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<void>,
    MarkReadNotificationRequest,
    Error,
    unknown
  >,
) => {
  return useMutation({
    mutationFn: (variables: MarkReadNotificationRequest, signal: AbortSignal) =>
      markReadNotification(variables, signal),
    mutationKey: ['mark-read-notification', 'list-notification'],
    ...options,
  })
}
