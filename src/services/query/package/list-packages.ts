import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Package } from '#/entities/packageEntity'
import type { ApiPackageList } from '#/dto/packageDto'
import { mapApiPackage } from '#/mappers/packageMapper'

interface ListPackagesRequest extends IPagingRequest {
  keyword?: string
  country?: string
  hospitalId?: string
  specialtyId?: number
  minPrice?: number
  maxPrice?: number
  specialized?: boolean
}

const getListPackages = async (
  params: ListPackagesRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiPackageList>('/packages', params, {
    signal,
  })

  const mappedData = response.data.content.map((item) => mapApiPackage(item))

  return {
    ...response,
    data: {
      ...response.data,
      content: mappedData,
    },
  }
}

export const useGetListPackagesQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<IPagingResponse<Package>>,
    ListPackagesRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-packages', options.params],
    queryFn: ({ signal }) => getListPackages(options.params, signal),
    ...options,
  })
}
