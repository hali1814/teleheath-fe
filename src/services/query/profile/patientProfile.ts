import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { PatientProfileResponse } from './getProfile'
import type { UpdateProfileRequest } from './updateProfile'

export async function addNewPatientProfile(
  request: UpdateProfileRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<PatientProfileResponse>> {
  return http.post<PatientProfileResponse>('/patients/me/family', request, {
    signal,
  })
}

export const useAddNewPatientProfileMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<PatientProfileResponse>,
    UpdateProfileRequest
  >,
) => {
  return useMutation({
    mutationFn: addNewPatientProfile,
    ...options,
  })
}

interface UpdatePatientProfileRequest extends UpdateProfileRequest {
  memberId: number
}

export async function updatePatientProfile(
  request: UpdatePatientProfileRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<PatientProfileResponse>> {
  return http.put<PatientProfileResponse>(
    `/patients/me/family/${request.memberId}`,
    request,
    {
      signal,
    },
  )
}

export const useUpdatePatientProfileMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<PatientProfileResponse>,
    UpdatePatientProfileRequest
  >,
) => {
  return useMutation({
    mutationFn: updatePatientProfile,
    ...options,
  })
}

export async function deletePatientProfile(
  memberId: number,
  signal: AbortSignal,
): Promise<HttpCommonResponse<void>> {
  return http.delete<void>(`/patients/me/family/${memberId}`, {
    signal,
  })
}

export const useDeletePatientProfileMutation = (
  options?: UseMutationOptions<HttpCommonResponse<void>, number>,
) => {
  return useMutation({
    mutationFn: deletePatientProfile,
    ...options,
  })
}
