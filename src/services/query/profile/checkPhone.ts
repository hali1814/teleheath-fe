import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface CheckPhoneResponse {
  exists: boolean
  phone: string
}

async function checkPhone(
  phone: string,
  signal: AbortSignal,
): Promise<HttpCommonResponse<CheckPhoneResponse>> {
  return http.get<CheckPhoneResponse>(
    '/patients/me/family/check-phone',
    { phone },
    { signal },
  )
}

export const useCheckPhoneMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<CheckPhoneResponse>,
    string
  >,
) => {
  return useMutation({
    mutationFn: checkPhone,
    ...options,
  })
}
