import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import Text from '#/components/text'
import { useBookingStore, type SelectedAddon } from '#/stores/booking-store'
import { DATA_TYPE, isCarDataType, TRIP_TYPE } from '#/const/addon'
import { ServiceCard } from '../ServiceCard'
import { First100Banner } from '../First100Banner'
import { AddonHotelModal } from '../AddonHotelModal'
import { useGetListAddonServicesByBranchQuery } from '#/services/query/services/list-addon-services-by-branch'
import { useGetListAddonPartnersByBranchQuery } from '#/services/query/services/list-addon-partners-by-branch'
import { useGetFirst100BannerQuery } from '#/services/query/promotions/first100-banner'
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
  const setAddonQuantity = useBookingStore((s) => s.setAddonQuantity)
  const setAddonTripType = useBookingStore((s) => s.setAddonTripType)
  const [openDetailService, setOpenDetailService] = useState(false)
  const [selectedService, setSelectedService] = useState<
    ServiceType | undefined
  >(undefined)
  // CR-02b: modal hotel (chỉ lưu khi Confirm)
  const [hotelTarget, setHotelTarget] = useState<ServiceType | undefined>(
    undefined,
  )

  // CR-02 §3.10: banner First100 — quyết định render + tính discount preview.
  const { data: bannerRes } = useGetFirst100BannerQuery()
  const banner = bannerRes?.data
  useEffect(() => {
    setData({ first100Banner: banner })
  }, [banner, setData])

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
          isBest: serviceType.isBest ?? false,
          typeName: serviceType.typeName,
          originalPrice: serviceType.price,
          price: serviceType.price,
          promotionPrice: serviceType.promotionPrice,
          description: serviceType.description,
          // CR-01/CR-02: 6 field mới
          dataTypeCode: serviceType.dataTypeCode,
          maxQuantity: serviceType.maxQuantity,
          promoEligible: serviceType.promoEligible,
          originalPrice2: serviceType.originalPrice2,
          promotionPrice2: serviceType.promotionPrice2,
          bccsServiceCode: serviceType.bccsServiceCode,
          bccsServiceCode2: serviceType.bccsServiceCode2,
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
            country: (partner.country ?? []).map((c) => ({
              code: c.code,
              nameVi: c.nameVi,
              nameEn: c.nameEn,
            })),
            address: partner.address ?? '',
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

  // CR-02b: xác nhận modal hotel — 0 phòng = bỏ chọn; ngược lại upsert với rooms.
  const handleHotelConfirm = (rooms: SelectedAddon['rooms']) => {
    if (!hotelTarget) return
    const current = addonServiceTypes ?? []
    if (!rooms?.length) {
      setData({
        addonServiceTypes: current.filter((p) => p.id !== hotelTarget.id),
      })
      return
    }
    const withoutSameAddon = current.filter(
      (p) => p.addonServiceId !== hotelTarget.addonServiceId,
    )
    const totalNights = rooms.reduce((acc, r) => acc + (r.nights || 0), 0)
    const selected: SelectedAddon = {
      ...hotelTarget,
      quantity: totalNights || 1,
      tripType: TRIP_TYPE.ONE_WAY,
      rooms,
    }
    setData({ addonServiceTypes: [...withoutSameAddon, selected] })
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

          {banner?.show_banner ? (
            <First100Banner
              title={banner.title}
              description={banner.description}
            />
          ) : null}

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
                                const selectedAddon =
                                  addonServiceTypes?.find(
                                    (p) => p.id === serviceType.id,
                                  )
                                return (
                                  <ServiceCard
                                    key={`${serviceType.partnerId}-${serviceType.id}`}
                                    service={serviceType}
                                    selected={!!selectedAddon}
                                    selectedAddon={selectedAddon}
                                    onQuantityChange={(q) =>
                                      setAddonQuantity(serviceType.id, q)
                                    }
                                    onTripTypeChange={(tt) =>
                                      setAddonTripType(serviceType.id, tt)
                                    }
                                    onEditClick={() =>
                                      setHotelTarget(serviceType)
                                    }
                                    onClick={() => {
                                      const current = addonServiceTypes ?? []

                                      const already = current.some(
                                        (p) => p.id === serviceType.id,
                                      )

                                      // CR-02b: hotel — nút "Selected" bỏ chọn như các type khác;
                                      // khi chưa chọn thì mở bottom modal (chọn phòng/ngày, lưu khi Confirm).
                                      if (
                                        serviceType.dataTypeCode ===
                                        DATA_TYPE.HOTEL
                                      ) {
                                        if (already) {
                                          setData({
                                            addonServiceTypes: current.filter(
                                              (p) => p.id !== serviceType.id,
                                            ),
                                          })
                                        } else {
                                          setHotelTarget(serviceType)
                                        }
                                        return
                                      }

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
                                      // CR-01/CR-02: gói mặc định quantity=1; xe (01/05) mặc định khứ hồi
                                      const selected: SelectedAddon = {
                                        ...serviceType,
                                        quantity: 1,
                                        tripType: isCarDataType(
                                          serviceType.dataTypeCode,
                                        )
                                          ? TRIP_TYPE.ROUND_TRIP
                                          : TRIP_TYPE.ONE_WAY,
                                        rooms: undefined,
                                      }
                                      setData({
                                        addonServiceTypes: [
                                          ...withoutSameAddon,
                                          selected,
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
        <AddonHotelModal
          open={!!hotelTarget}
          onOpenChange={(o) => !o && setHotelTarget(undefined)}
          initialRooms={
            hotelTarget
              ? addonServiceTypes?.find((p) => p.id === hotelTarget.id)?.rooms
              : undefined
          }
          onConfirm={handleHotelConfirm}
        />
      </PullToRefresh>
    </>
  )
}
