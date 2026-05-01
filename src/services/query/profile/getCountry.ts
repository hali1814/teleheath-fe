import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

/** GET không có query */
export interface GetCountriesRequest {}

export interface CountryItem {
  code: string
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
}

const getCountries = async (
  _params: GetCountriesRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<CountryItem[]>(
    '/locations/countries',
    {},
    {
      signal,
    },
  )
  return response
}
//f
export const useGetCountriesQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<CountryItem[]>,
    GetCountriesRequest
  >,
) => {
  return useQuery({
    queryKey: ['locations', 'countries', options.params],
    queryFn: ({ signal }) => getCountries(options.params, signal),
    gcTime: 1000 * 60 * 60 * 24,
    ...options,
  })
}
