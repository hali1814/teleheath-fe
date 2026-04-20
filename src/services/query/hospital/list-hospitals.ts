import type { ApiHospitalList } from '#/dto/hospitalDto'
import type { Hospital } from '#/entities/hospitalEntity'
import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiHospital } from '#/mappers/hospitalMapper'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { Hospital as ApiHospital } from '#/types/hospital'

interface ListHospitalsRequest extends IPagingRequest {
  keyword?: string
  country?: string
  hasRoomAvailable?: boolean
}

const getListHospitals = async (
  params: ListHospitalsRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiHospitalList>('/hospitals', params, {
    signal,
  })

  const mappedData = response.data.content.map((hospital) =>
    mapApiHospital(hospital),
  )

  return {
    ...response,
    data: {
      ...response.data,
      content: mappedData,
    },
  }
}

export const useGetListHospitalsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<IPagingResponse<Hospital>>,
    ListHospitalsRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-hospitals', options.params],
    queryFn: ({ signal }) => getListHospitals(options.params, signal),
    ...options,
  })
}
