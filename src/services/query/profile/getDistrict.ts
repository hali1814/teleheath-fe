import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface GetDistrictsRequest {
  /** ID thành phố — path `/locations/cities/:cityId/districts` */
  cityId: number
}

export interface DistrictItem {
  id: number
  nameVi: string
  nameEn: string
  nameKh: string
}

const getDistricts = async (
  params: GetDistrictsRequest,
  signal: AbortSignal,
) => {
  const { cityId } = params
  const response = await http.get<DistrictItem[]>(
    `/locations/cities/${cityId}/districts`,
    {},
    {
      signal,
    },
  )
  return response
}

export const useGetDistrictsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<DistrictItem[]>,
    GetDistrictsRequest
  >,
) => {
  return useQuery({
    queryKey: ['locations', 'cities', options.params.cityId, 'districts'],
    queryFn: ({ signal }) => getDistricts(options.params, signal),
    gcTime: 1000 * 60 * 60 * 24,
    ...options,
  })
}
