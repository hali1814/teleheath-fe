import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface SearchMedicalProfileRequest {
  patientId: string
}

export interface SearchMedicalProfileAddress {
  countryCode?: string | null
  countryName?: string | null
  cityId?: number | null
  cityName?: string | null
  districtId?: number | null
  districtName?: string | null
  precinctId?: number | null
  precinctName?: string | null
  detail?: string | null
  fullAddress?: string | null
}

export interface SearchMedicalProfilePatient {
  id: number
  profileCode: string
  fullName: string
  contactNumber: string
  email: string
  dob: string
  gender: string
  address: SearchMedicalProfileAddress | null
  nationality: string | null
  nationalId: string | null
  relationship: string | null
  avatarUrl: string | null
  status: string | null
  profileCompleted: boolean
  owner: boolean
}

export interface SearchMedicalProfileResponse {
  content: MyAppointmentItem[]
  profile: SearchMedicalProfilePatient | null
  errorCode?: string
}

const searchMedicalProfile = async (
  request: SearchMedicalProfileRequest,
  signal: AbortSignal,
) =>
  http.post<SearchMedicalProfileResponse>(
    '/profile-lookup/patient-id/search',
    request,
    { signal },
  )

export const useSearchMedicalProfileMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<SearchMedicalProfileResponse>,
    SearchMedicalProfileRequest
  >,
) =>
  useMutation({
    mutationFn: searchMedicalProfile,
    ...options,
  })

export const useSearchMedicalProfileQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<SearchMedicalProfileResponse>,
    SearchMedicalProfileRequest
  >,
) =>
  useQuery({
    queryKey: ['profile-lookup', 'patient-id', options.params.patientId],
    queryFn: ({ signal }) => searchMedicalProfile(options.params, signal),
    enabled: !!options.params.patientId,
    ...options,
  })
