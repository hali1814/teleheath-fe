import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export type BannerNavigationType = 'INTERNAL' | 'EXTERNAL'

export interface BannerItem {
  id: number
  imageUrl: string
  navigationType: BannerNavigationType
  navigationTarget: string
  sortOrder: number
}

export type BannersListRequest = Record<string, never>

const getBanners = async (
  _params: BannersListRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<BannerItem[]>> => {
  return http.get<BannerItem[]>('/banners', undefined, { signal })
}

export const useGetBannersQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<BannerItem[]>,
    BannersListRequest
  >,
) => {
  return useQuery({
    queryKey: ['banners', options.params],
    queryFn: ({ signal }) => getBanners(options.params, signal),
    ...options,
  })
}
