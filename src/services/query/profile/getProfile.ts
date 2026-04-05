import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface GetProfileRequest {}

export interface PatientProfileResponse {
  id: number
  camId?: string | null
  fullName: string
  phone: string
  email: string
  dateOfBirth: string
  dob?: string | null
  gender: string
  address?: {
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
  } | null
  avatarUrl: string | null
  nationality?: string | null
  idCard?: string | null
  patientCode?: string | null
  profileCode?: string | null
  relationship: string
  patientStatus?: string
  owner?: boolean
  contactNumber?: string | null
}

const getProfile = async (_params: GetProfileRequest, signal: AbortSignal) => {
  const response = await http.get<PatientProfileResponse>(
    '/users/me',
    {},
    {
      signal,
    },
  )
  return response
}

export const useGetProfileQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<PatientProfileResponse>,
    GetProfileRequest
  >,
) => {
  return useQuery({
    queryKey: ['patients', 'me', options.params],
    queryFn: ({ signal }) => getProfile(options.params, signal),
    ...options,
  })
}
