import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListPackagesRequest extends IPagingRequest {}

interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  email: string
  website: string
}

export interface Package {
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

export interface ListPackagesResponse extends IPagingResponse<Package> {}

const getListPackages = async (
  params: ListPackagesRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ListPackagesResponse>('/packages', params, {
    signal,
  })
  return response
}

export const useGetListPackagesQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ListPackagesResponse>,
    ListPackagesRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-packages', options.params],
    queryFn: ({ signal }) => getListPackages(options.params, signal),
    ...options,
  })
}
