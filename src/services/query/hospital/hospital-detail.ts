import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital } from '#/entities/hospitalEntity'
import type { ApiHospital } from '#/dto/hospitalDto'

interface HospitalDetailRequest {
  hospitalId: string
}

const getHospitalDetail = async (
  params: HospitalDetailRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiHospital>(
    `/hospitals/${params.hospitalId}`,
    params,
    {
      signal,
    },
  )

  const mappedData = mapApiHospital(response.data)

  return {
    ...response,
    data: mappedData,
  }
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
