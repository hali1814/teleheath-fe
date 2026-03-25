import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital } from '#/types/hospital'

interface HospitalDetailRequest {
  hospitalId: string
}

const getHospitalDetail = async (
  params: HospitalDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<Hospital>(
    `/hospitals/${params.hospitalId}`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetHospitalDetailQuery = (
  options: UseQueryOptions<HttpCommonResponse<Hospital>, HospitalDetailRequest>,
) => {
  return useQuery({
    queryKey: ['hospital-detail', options.params],
    queryFn: ({ signal }) => getHospitalDetail(options.params, signal),
    ...options,
  })
}
