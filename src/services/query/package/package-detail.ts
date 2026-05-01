import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Package } from '#/entities/packageEntity'
import type { ApiPackage } from '#/dto/packageDto'
import { mapApiPackage } from '#/mappers/packageMapper'

interface PackageDetailRequest {
  packageId: number
}

const getPackageDetail = async (
  params: PackageDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiPackage>(`/packages/${params.packageId}`, {
    signal,
  })
  console.log(response)
  const mappedData = mapApiPackage(response.data)

  return {
    ...response,
    data: mappedData,
  }
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
