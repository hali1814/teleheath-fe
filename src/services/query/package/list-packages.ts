import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

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
  category?: 'GENERAL' | 'SPECIALIZE'
  minPrice?: number
  maxPrice?: number
  specialized?: boolean
  isHome?: boolean
  homeSize?: number
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

export type ListPackagesInfiniteParams = Omit<ListPackagesRequest, 'page'> & {
  size?: number
}

export const useGetListPackagesInfiniteQuery = ({
  params,
  enabled,
  staleTime,
}: {
  params: ListPackagesInfiniteParams
  enabled?: boolean
  staleTime?: number
}) => {
  const { i18n } = useTranslation()
  const size = params.size ?? 10

  return useInfiniteQuery({
    queryKey: ['list-packages-infinite', { ...params, size }, i18n.language],
    queryFn: ({ pageParam = 0, signal }) =>
      getListPackages(
        {
          ...params,
          page: pageParam,
          size,
        },
        signal,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.data
      if (!pageInfo || pageInfo.last) return undefined
      return pageInfo.page + 1
    },
    enabled,
    staleTime,
  })
}
