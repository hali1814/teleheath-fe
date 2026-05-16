import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

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

export type ListHospitalsInfiniteParams = Omit<ListHospitalsRequest, 'page'> & {
  size?: number
}

export const useGetListHospitalsInfiniteQuery = ({
  params,
  enabled,
  staleTime,
}: {
  params: ListHospitalsInfiniteParams
  enabled?: boolean
  staleTime?: number
}) => {
  const { i18n } = useTranslation()
  const size = params.size ?? 10

  return useInfiniteQuery({
    queryKey: ['list-hospitals-infinite', { ...params, size }, i18n.language],
    queryFn: ({ pageParam = 0, signal }) =>
      getListHospitals(
        {
          page: pageParam,
          size,
          keyword: params.keyword,
          country: params.country,
          hasRoomAvailable: params.hasRoomAvailable,
          sortBy: params.sortBy,
          sortDir: params.sortDir,
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
