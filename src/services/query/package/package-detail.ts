import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface PackageDetailRequest {
  packageId: string
}

interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  email: string
  website: string
}

export interface PackageDetailResponse {
  id: number
  name: string
  description: string
  category: string
  price: number
  durationMinutes: number
  imageUrl: string
  hospitals: Hospital[]
  active: boolean
}

const getPackageDetail = async (
  params: PackageDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<PackageDetailResponse>(
    `/packages/${params.packageId}`,
    { signal },
  )
  return response
}

export const useGetPackageDetailQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<PackageDetailResponse>,
    PackageDetailRequest
  >,
) => {
  return useQuery({
    queryKey: ['package-detail', options.params],
    queryFn: ({ signal }) => getPackageDetail(options.params, signal),
    ...options,
  })
}
