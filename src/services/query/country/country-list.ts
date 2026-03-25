import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Country } from '#/types/country'

interface CountryListRequest {}

const getCountryList = async (
  params: CountryListRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Country[]>(
    `/locations/countries`,
    {},
    {
      signal,
      params,
    },
  )
  return response
}

export const useGetCountryListQuery = (
  options: UseQueryOptions<HttpCommonResponse<Country[]>, CountryListRequest>,
) => {
  return useQuery({
    queryKey: ['country-list', options.params],
    queryFn: ({ signal }) => getCountryList(options.params, signal),
    ...options,
  })
}
