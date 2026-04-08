import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListServiceTypeRequest {
  addonServiceIds: number[]
}

interface ServiceTypeCountry {
  code: string
  nameVi: string
  nameEn: string
}

interface ServiceTypePartner {
  id: number
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
  photoUrl: string
  country: ServiceTypeCountry[]
  address: string
  distanceFromHospital: string
}

interface ServiceTypeAmenity {
  name: string
  iconUrl: string
}

export interface ServiceTypeResponse {
  id: number
  isBest: boolean
  typeName: string
  originalPrice: number
  price: number
  promotionPrice: number
  description: string
  addonServiceId: number
  addonServiceName: string
  partnerId: number
  partnerName: string
  partner: ServiceTypePartner
  amenities: ServiceTypeAmenity[]
}

const getListServiceType = async (
  params: ListServiceTypeRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<ServiceTypeResponse[]>(
    '/addon-partners/service-types',
    {
      addonServiceIds: params.addonServiceIds,
    },
    {
      signal,
    },
  )
  return response
}

export const useGetListServiceTypeQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<ServiceTypeResponse[]>,
    ListServiceTypeRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-service-type', options.params],
    queryFn: ({ signal }) => getListServiceType(options.params, signal),
    ...options,
  })
}