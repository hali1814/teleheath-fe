import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import type { ApiDoctorList } from '#/dto/doctorDto'
import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { mapApiDoctor } from '#/mappers/doctorMapper'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import type { Doctor } from '#/entities/doctorEntity'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListDoctorRequest extends IPagingRequest {
  country?: string
  hospitalId?: string
  /** ID chuyên khoa */
  specialtyId?: number
  gender?: string
  minExperience?: number
  maxExperience?: number
  minPrice?: number
  maxPrice?: number
  keyword?: string
  topOnly?: boolean
  isHome?: boolean
  homeSize?: number
}

const getListDoctor = async (
  params: ListDoctorRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ApiDoctorList>('/doctors', params, {
    signal,
  })

  const mappedData = response.data.content.map((api) => mapApiDoctor(api))

  return {
    ...response,
    data: {
      ...response.data,
      content: mappedData,
    },
  }
}

export const useGetListDoctorQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<IPagingResponse<Doctor>>,
    ListDoctorRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-doctor', options.params],
    queryFn: ({ signal }) => getListDoctor(options.params, signal),
    ...options,
    onError: (error) => {
      console.log(error)
    },
  })
}

export type ListDoctorInfiniteParams = Omit<ListDoctorRequest, 'page'> & {
  size?: number
}

export const useGetListDoctorInfiniteQuery = ({
  params,
  enabled,
  staleTime,
}: {
  params: ListDoctorInfiniteParams
  enabled?: boolean
  staleTime?: number
}) => {
  const { i18n } = useTranslation()
  const size = params.size ?? 10

  return useInfiniteQuery({
    queryKey: ['list-doctor-infinite', { ...params, size }, i18n.language],
    queryFn: ({ pageParam = 0, signal }) =>
      getListDoctor(
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
