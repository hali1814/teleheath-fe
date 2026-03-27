import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface GetPrecinctsRequest {
  /** ID quận/huyện — path `/locations/districts/:districtId/precincts` */
  districtId: number
}

export interface PrecinctItem {
  id: number
  nameVi: string
  nameEn: string
  nameKh: string
}

const getPrecincts = async (
  params: GetPrecinctsRequest,
  signal: AbortSignal,
) => {
  const { districtId } = params
  const response = await http.get<PrecinctItem[]>(
    `/locations/districts/${districtId}/precincts`,
    {},
    {
      signal,
    },
  )
  return response
}

export const useGetPrecinctsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<PrecinctItem[]>,
    GetPrecinctsRequest
  >,
) => {
  return useQuery({
    queryKey: [
      'locations',
      'districts',
      options.params.districtId,
      'precincts',
    ],
    queryFn: ({ signal }) => getPrecincts(options.params, signal),
    gcTime: 1000 * 60 * 60 * 24,
    ...options,
  })
}
