import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { ApiSpecialtyList } from '#/dto/specialtyDto'
import type { Specialty } from '#/entities/specialtyEntity'
import { mapApiSpecialty } from '#/mappers/specialtyMapper'

interface ListSpecialtyRequest {
  hospitalId?: string
  keyword?: string
  country?: 'VN' | 'KH'
  size?: number
  isHome?: boolean
}

const getListSpecialty = async (
  params: ListSpecialtyRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiSpecialtyList>(`/specialties`, params, {
    signal,
  })

  const mappedData = response.data.map((specialty) =>
    mapApiSpecialty(specialty),
  )

  return {
    ...response,
    data: mappedData,
  }
}

export const useGetListSpecialtyQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<Specialty[]>,
    ListSpecialtyRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-specialty', options.params],
    queryFn: ({ signal }) => getListSpecialty(options.params, signal),
    ...options,
  })
}
