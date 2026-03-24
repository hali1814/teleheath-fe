import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'

import { http, type HttpCommonResponse } from '#/services/network/http-request'

import type { PatientProfileResponse } from '#/services/query/profile/getProfile'

export interface UpdateProfileAddress extends NonNullable<
  PatientProfileResponse['address']
> {}

export interface UpdateProfileRequest {
  name: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  avatarUrl?: string | null
  relationship?: string
  nationality?: string | null
  address?: UpdateProfileAddress | null
}

export async function updateProfile(
  request: UpdateProfileRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<PatientProfileResponse>> {
  return http.put<PatientProfileResponse>('/users/me', request, {
    signal,
  })
}

export const useUpdateProfileMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<PatientProfileResponse>,
    UpdateProfileRequest
  >,
) => {
  return useMutation({
    mutationFn: updateProfile,
    ...options,
  })
}
