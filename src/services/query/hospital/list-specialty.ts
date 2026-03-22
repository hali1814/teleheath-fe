import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListSpecialtyRequest extends IPagingRequest {}

export interface ListSpecialtyResponse extends IPagingResponse<{
  id: number
  name: string
  description: string
  iconUrl: string
}> {}

const getListSpecialty = async (
  params: ListSpecialtyRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListSpecialtyResponse>(
    `/specialties`,
    {},
    {
      signal,
      params,
    },
  )
  return response
}

export const useGetListSpecialtyQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListSpecialtyResponse>,
    ListSpecialtyRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-specialty', options.params],
    queryFn: ({ signal }) => getListSpecialty(options.params, signal),
    ...options,
  })
}
