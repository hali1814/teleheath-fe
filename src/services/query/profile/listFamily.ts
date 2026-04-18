import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { PatientProfileResponse } from './getProfile'

interface ListFamilyRequest {
  name?: string
}

export interface ListFamilyPatient {
  id: number
  name: string
  avatarUrl: string | null
  dateOfBirth: string
  phone: string
  relationship: string
  gender: string
  email: string | null
  address?: PatientProfileResponse['address']
  patientCode?: string | null
  profileCode?: string | null
  fullName?: string | null
  dob?: string | null
  contactNumber?: string | null
  genderText?: string | null
}

export interface ListFamilyResponse {
  patients: ListFamilyPatient[]
  totalCount: number
  maxAllowed: number
  canAddMore: boolean
}

const getListFamily = async (
  params: ListFamilyRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListFamilyResponse>(
    '/patients/me/family',
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetListFamilyQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListFamilyResponse>,
    ListFamilyRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-family', options.params],
    queryFn: ({ signal }) => getListFamily(options.params, signal),
    ...options,
  })
}

export async function getPatientProfile(
  memberId: number,
  signal: AbortSignal,
): Promise<HttpCommonResponse<PatientProfileResponse>> {
  return http.get<PatientProfileResponse>(
    `/patients/${memberId}`,
    {},
    {
      signal,
    },
  )
}

export const useGetPatientProfileMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<PatientProfileResponse>,
    number
  >,
) => {
  return useMutation({
    mutationFn: getPatientProfile,
    ...options,
  })
}
