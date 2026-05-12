import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import Text from '#/components/text'
import { Checkbox } from '#/components/ui/checkbox'
import { useBookingStore } from '#/stores/booking-store'
import { ServiceCard } from '../ServiceCard'
import { useGetListAddonServicesByBranchQuery } from '#/services/query/services/list-addon-services-by-branch'
import { useGetListAddonPartnersByBranchQuery } from '#/services/query/services/list-addon-partners-by-branch'
import { ModalDetailServiceType } from '../ModalDetailServiceType'
import type { ServiceType } from '#/types/service'
import { EmptyState } from '#/sections/search'
import LoadingState from '#/components/LoadingState'
import { useTranslation } from 'react-i18next'
import PullToRefresh from '#/components/PullToRefresh'
import { Icon } from '#/components/icon'

export function ServiceStep() {
  const { t } = useTranslation(['book-appointment'])
  const { addonServiceTypes, serviceIds, setData, branch } = useBookingStore()
  const [openDetailService, setOpenDetailService] = useState(false)
  const [selectedService, setSelectedService] = useState<
    ServiceType | undefined
  >(undefined)

  const {
    data: addonServices,
    isLoading: isAddonServicesLoading,
    refetch: refetchAddonServices,
  } = useGetListAddonServicesByBranchQuery({
    params: {
      branchId: branch?.branchId ?? 0,
    },
    enabled: !!branch?.branchId,
  })

  const {
    data: addonPartners,
    isLoading: isServiceTypesLoading,
    refetch: refetchServiceTypes,
  } = useGetListAddonPartnersByBranchQuery({
    params: {
      branchId: branch?.branchId ?? 0,
      addonServiceIds: serviceIds ?? [],
    },
    enabled: !!branch?.branchId && (serviceIds?.length ?? 0) > 0,
  })

  const addonServiceIds = useMemo(
    () => (addonServices?.data ?? []).map((service) => service.id),
    [addonServices?.data],
  )

  const lastAutoSelectKeyRef = useRef<string | null>(null)

  useEffect(() => {
    if (!branch?.branchId || !addonServiceIds.length) return

    const key = `${String(branch.branchId)}:${addonServiceIds.join(',')}`
    if (lastAutoSelectKeyRef.current === key) return

    lastAutoSelectKeyRef.current = key
    setData({ serviceIds: [...addonServiceIds] })
  }, [branch?.branchId, addonServiceIds, setData])

  // API mới trả về theo partner (mỗi partner có nhiều serviceTypes).
  // Flatten về dạng ServiceType[] để giữ tương thích với ServiceCard / ModalDetailServiceType / booking store.
  const filteredServiceTypes = useMemo<ServiceType[]>(() => {
    const partners = addonPartners?.data ?? []
    const selectedIds = serviceIds ?? []

    return partners
      .filter((partner) => selectedIds.includes(partner.addonServiceId))
      .flatMap((partner) =>
        (partner.serviceTypes ?? []).map<ServiceType>((serviceType) => ({
          id: serviceType.id,
          isBest: false,
          typeName: serviceType.typeName,
          originalPrice: serviceType.price,
          price: serviceType.price,
          promotionPrice: serviceType.promotionPrice,
          description: serviceType.description,
          addonServiceId: partner.addonServiceId,
          addonServiceName: partner.addonServiceName,
          partnerId: partner.id,
          partnerName: partner.name,
          partner: {
            id: partner.id,
            name: partner.name,
            nameVi: partner.nameVi,
            nameEn: partner.nameEn,
            nameKh: partner.nameKh,
            photoUrl: partner.photoUrl,
            country: partner.country,
            address: '',
            distanceFromHospital: partner.distanceFromHospital,
          },
          amenities: serviceType.amenities ?? [],
        })),
      )
  }, [addonPartners?.data, serviceIds])

  // Bỏ service type đã chọn nếu user bỏ tick addon service tương ứng
  useEffect(() => {
    const current = addonServiceTypes ?? []
    if (!current.length) return

    const next = current.filter((item) =>
      (serviceIds ?? []).includes(item.addonServiceId),
    )
    if (next.length === current.length) return
    setData({ addonServiceTypes: next })
  }, [serviceIds, addonServiceTypes, setData])

  const handleRefresh = async () => {
    await refetchAddonServices()
    await refetchServiceTypes()
  }

  return (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="flex min-w-0 w-full flex-col gap-[16px] px-[16px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center">
              <Icon name="star_fall" />
              <Text size="base_14" className="leading-[24px] font-semibold">
                {t('serviceStep.whatDoWeHaveForYou')}
              </Text>
            </div>
            <Text size="sm_12" className="leading-[1.2] text-[#5D3F3D]">
              {t('serviceStep.selectAddonServicesDescription')}
            </Text>
          </div>
          <div className="flex max-w-full flex-wrap gap-x-[16px] gap-y-[12px]">
            {addonServices?.data?.map((service) => (
              <Fragment key={service.id}>
                <div
                  className="flex shrink-0 items-center gap-[6px] p-[8px] rounded-[20px] border border-[#BD001A] bg-white"
                  onClick={() => {
                    if (serviceIds?.includes(service.id)) {
                      setData({
                        serviceIds: serviceIds?.filter((s) => s !== service.id),
                      })
                    } else {
                      setData({
                        serviceIds: [...(serviceIds ?? []), service.id],
                      })
                    }
                  }}
                >
                  {serviceIds?.includes(service.id) ? (
                    <Icon
                      name="check_circle_solid"
                      className="size-[16px] text-[#BD001A]"
                    />
                  ) : (
                    <div className="size-[16px] rounded-full border border-[#BD001A]/50" />
                  )}
                  <Text size="sm_12" className="leading-normal font-medium">
                    {service.name}
                  </Text>
                </div>
              </Fragment>
            ))}
          </div>

          {addonServices?.data
            ?.filter((service) => serviceIds?.includes(service.id))
            .map((service) => (
              <Fragment key={service.id}>
                <div className="flex flex-col gap-[16px]">
                  <Text size="lg_16" className="leading-[22px] font-semibold">
                    {service.name}
                  </Text>
                </div>
                <div className="w-full">
                  {isAddonServicesLoading || isServiceTypesLoading ? (
                    <LoadingState className="h-[200px]" />
                  ) : (
                    <>
                      {filteredServiceTypes.filter(
                        (item) => item.addonServiceId === service.id,
                      ).length > 0 ? (
                        <div className="w-full overflow-x-auto p-px">
                          <div className="flex min-w-max gap-x-[6px]">
                            {filteredServiceTypes
                              .filter(
                                (item) => item.addonServiceId === service.id,
                              )
                              .map((serviceType) => {
                                return (
                                  <ServiceCard
                                    key={serviceType.id}
                                    service={serviceType}
                                    selected={
                                      addonServiceTypes?.some(
                                        (p) => p.id === serviceType.id,
                                      ) ?? false
                                    }
                                    onClick={() => {
                                      const current = addonServiceTypes ?? []
                                      const already = current.some(
                                        (p) => p.id === serviceType.id,
                                      )

                                      if (already) {
                                        setData({
                                          addonServiceTypes: current.filter(
                                            (p) => p.id !== serviceType.id,
                                          ),
                                        })
                                        return
                                      }

                                      // Mỗi addon service chỉ 1 partner: bỏ partner khác cùng addonServiceId rồi chọn partner này
                                      const withoutSameAddon = current.filter(
                                        (p) =>
                                          p.addonServiceId !==
                                          serviceType.addonServiceId,
                                      )
                                      setData({
                                        addonServiceTypes: [
                                          ...withoutSameAddon,
                                          serviceType,
                                        ],
                                      })
                                    }}
                                    onDetailClick={() => {
                                      setSelectedService(serviceType)
                                      setOpenDetailService(true)
                                    }}
                                  />
                                )
                              })}
                          </div>
                        </div>
                      ) : (
                        <EmptyState className="h-auto">
                          {t('serviceStep.empty')}
                        </EmptyState>
                      )}
                    </>
                  )}
                </div>
              </Fragment>
            ))}
        </div>
        <ModalDetailServiceType
          serviceType={selectedService}
          open={openDetailService}
          onOpenChange={setOpenDetailService}
        />
      </PullToRefresh>
    </>
  )
}
