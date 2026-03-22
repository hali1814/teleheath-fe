import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListFamilyRequest {}

export interface ListFamilyResponse {
  id: number
  camId: string
  name: string
  phone: string
  email: string | null
  dateOfBirth: string
  gender: string
  address: string | null
  avatarUrl: string | null
  nationality: string | null
  idCard: string | null
  patientCode: string | null
  relationship: string
  patientStatus: string
  owner: boolean
}

const getListFamily = async (
  params: ListFamilyRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListFamilyResponse[]>(
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
    HttpCommonResponse<ListFamilyResponse[]>,
    ListFamilyRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-family', options.params],
    queryFn: ({ signal }) => getListFamily(options.params, signal),
    ...options,
  })
}
