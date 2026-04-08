import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import Text from '#/components/text'
import { Checkbox } from '#/components/ui/checkbox'
import { useBookingStore } from '#/stores/booking-store'
import { ServiceCard } from '../ServiceCard'
import SearchBar from '#/components/SearchBar'
import { useGetListAddonServicesByBranchQuery } from '#/services/query/services/list-addon-services-by-branch'
import { useGetListServiceTypeQuery } from '#/services/query/services/list-service-type'
import { ModalDetailServiceType } from '../ModalDetailServiceType'
import type { ServiceType } from '#/types/service'
import { Icon } from '#/components/icon'
import { Badge } from '#/components/ui/badge'
import { useSearch } from '@tanstack/react-router'
import ModalFilterServiceType from '../ModalFilterServiceType'
import { EmptyState } from '#/sections/search'
import LoadingState from '#/components/LoadingState'
import { useTranslation } from 'react-i18next'

export function ServiceStep() {
  const { t } = useTranslation(['book-appointment'])
  const [openFilter, setOpenFilter] = useState(false)
  const { addonServiceTypes, serviceIds, setData, branch } = useBookingStore()
  const [search, setSearch] = useState('')
  const [openDetailService, setOpenDetailService] = useState(false)
  const [selectedService, setSelectedService] = useState<
    ServiceType | undefined
  >(undefined)
  const [country, setCountry] = useState<string | undefined>(undefined)

  const { data: addonServices, isLoading: isAddonServicesLoading } =
    useGetListAddonServicesByBranchQuery({
      params: {
        branchId: branch?.branchId ?? 0,
      },
      enabled: !!branch?.branchId,
    })

  const { data: serviceTypes, isLoading: isServiceTypesLoading } =
    useGetListServiceTypeQuery({
      params: {
        addonServiceIds: serviceIds ?? [],
      },
      enabled: (serviceIds?.length ?? 0) > 0,
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

  const filteredServiceTypes = useMemo(() => {
    const list = serviceTypes?.data ?? []
    const byAddon = list.filter((item) =>
      (serviceIds ?? []).includes(item.addonServiceId),
    )

    const byCountry = country
      ? byAddon.filter((item) =>
          (item.partner?.country ?? []).find((c) => c.code === country),
        )
      : byAddon

    const q = search.trim().toLowerCase()
    if (!q) return byCountry

    return byCountry.filter((item) => {
      const partnerName = (item.partnerName ?? '').toLowerCase()
      const typeName = (item.typeName ?? '').toLowerCase()
      const addonServiceName = (item.addonServiceName ?? '').toLowerCase()

      return (
        partnerName.includes(q) ||
        typeName.includes(q) ||
        addonServiceName.includes(q)
      )
    })
  }, [serviceTypes?.data, serviceIds, search, country])

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

  return (
    <>
      <div className="flex min-w-0 w-full flex-col gap-[16px] px-[16px]">
        <div className="flex items-center gap-[10px]">
          <SearchBar
            placeholder={t('serviceStep.searchPlaceholder')}
            value={search}
            onSearch={(value) => setSearch(value)}
            onClear={() => setSearch('')}
          />
          <button
            type="button"
            className="relative flex shrink-0 items-center justify-center"
            onClick={() => setOpenFilter(true)}
            aria-label={t('serviceStep.filterAriaLabel')}
          >
            <Icon name="filter" className="text-icon" />
            <Badge className="absolute -top-2 -right-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full p-0 px-[4px] text-[10px]">
              <Text size="xs_10" className="leading-[1.3] text-white">
                {country ? 1 : 0}
              </Text>
            </Badge>
          </button>
        </div>

        <div className="flex max-w-full flex-wrap gap-x-[16px] gap-y-[12px]">
          {addonServices?.data?.map((service, index) => (
            <Fragment key={service.id}>
              <div className="flex shrink-0 items-center gap-[12px]">
                <Checkbox
                  className="w-[20px] h-[20px] text-white border-secondary/20"
                  checked={serviceIds?.includes(service.id)}
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
                />
                <Text
                  size="sm_12"
                  className="leading-normal text-muted-foreground"
                >
                  {service.name}
                </Text>
              </div>
              {index < addonServices?.data?.length - 1 && (
                <div className="w-px shrink-0 self-stretch bg-[#DFDFDF]" />
              )}
            </Fragment>
          ))}
        </div>

        {isAddonServicesLoading || isServiceTypesLoading ? (
          <LoadingState className="h-[200px]" />
        ) : (
          <>
            {filteredServiceTypes.length > 0 ? (
              <>
                {filteredServiceTypes.map((serviceType) => {
                  const pickedForAddon = addonServiceTypes?.find(
                    (p) => p.addonServiceId === serviceType.addonServiceId,
                  )
                  const selectionDisabled =
                    pickedForAddon != null &&
                    pickedForAddon.id !== serviceType.id

                  return (
                    <ServiceCard
                      key={serviceType.id}
                      service={serviceType}
                      selected={
                        addonServiceTypes?.some(
                          (p) => p.id === serviceType.id,
                        ) ?? false
                      }
                      disabled={selectionDisabled}
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
                            p.addonServiceId !== serviceType.addonServiceId,
                        )
                        setData({
                          addonServiceTypes: [...withoutSameAddon, serviceType],
                        })
                      }}
                      onDetailClick={() => {
                        setSelectedService(serviceType)
                        setOpenDetailService(true)
                      }}
                    />
                  )
                })}
              </>
            ) : (
              <EmptyState className="h-auto">
                {t('serviceStep.empty')}
              </EmptyState>
            )}
          </>
        )}
      </div>
      <ModalDetailServiceType
        serviceType={selectedService}
        open={openDetailService}
        onOpenChange={setOpenDetailService}
      />
      <ModalFilterServiceType
        open={openFilter}
        onOpenChange={setOpenFilter}
        onApply={(filter) => {
          setCountry(filter.country)
        }}
        appliedFilter={{
          country: country ?? '',
        }}
      />
    </>
  )
}
