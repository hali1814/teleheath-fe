import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface ListAddonPartnersByBranchRequest {
  branchId: string | number
  addonServiceIds: number[]
}

interface AddonPartnerCountry {
  code: string
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
}

interface AddonPartnerAmenity {
  name: string
  iconUrl: string
}

export interface AddonPartnerServiceType {
  id: number
  isBest?: boolean
  typeName: string
  price: number
  promotionPrice: number
  description: string
  amenities: AddonPartnerAmenity[]
  /** CR-01/CR-02 — 6 field mới (BE bổ sung; optional để không vỡ khi BE chưa lên). */
  dataTypeCode?: string
  maxQuantity?: number | null
  promoEligible?: boolean
  originalPrice2?: number
  promotionPrice2?: number
  bccsServiceCode?: string
  bccsServiceCode2?: string
}

export interface AddonPartnerByBranchResponse {
  id: number
  addonServiceId: number
  addonServiceName: string
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
  photoUrl: string
  country: AddonPartnerCountry[]
  address: string
  distanceFromHospital: string
  serviceTypes: AddonPartnerServiceType[]
}

const getListAddonPartnersByBranch = async (
  params: ListAddonPartnersByBranchRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<AddonPartnerByBranchResponse[]>(
    `/branches/${params.branchId}/addon-partners`,
    {
      addonServiceIds: params.addonServiceIds,
    },
    {
      signal,
    },
  )
  return response
}

export const useGetListAddonPartnersByBranchQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<AddonPartnerByBranchResponse[]>,
    ListAddonPartnersByBranchRequest
  >,
) => {
  return useQuery({
    queryKey: ['list-addon-partners-by-branch', options.params],
    queryFn: ({ signal }) =>
      getListAddonPartnersByBranch(options.params, signal),
    ...options,
  })
}
