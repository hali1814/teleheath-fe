import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Package } from '#/types/package'

interface PackageDetailRequest {
  packageId: number
}

const getPackageDetail = async (
  params: PackageDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Package>(`/packages/${params.packageId}`, {
    signal,
  })
  return response
}

export const useGetPackageDetailQuery = (
  options: UseQueryOptions<HttpCommonResponse<Package>, PackageDetailRequest>,
) => {
  return useQuery({
    queryKey: ['package-detail', options.params],
    queryFn: ({ signal }) => getPackageDetail(options.params, signal),
    ...options,
  })
}
