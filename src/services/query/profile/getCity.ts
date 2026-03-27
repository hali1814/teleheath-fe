import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface GetCitiesRequest {
  countryCode: string
}

export interface CityItem {
  id: number
  nameVi: string
  nameEn: string
  nameKh: string
}

const getCities = async (params: GetCitiesRequest, signal: AbortSignal) => {
  const { countryCode } = params
  const response = await http.get<CityItem[]>(
    `/locations/countries/${countryCode}/cities`,
    {},
    {
      signal,
    },
  )
  return response
}

export const useGetCitiesQuery = (
  options: UseQueryOptions<HttpCommonResponse<CityItem[]>, GetCitiesRequest>,
) => {
  return useQuery({
    queryKey: ['locations', 'countries', options.params.countryCode, 'cities'],
    queryFn: ({ signal }) => getCities(options.params, signal),
    gcTime: 1000 * 60 * 60 * 24,
    ...options,
  })
}
