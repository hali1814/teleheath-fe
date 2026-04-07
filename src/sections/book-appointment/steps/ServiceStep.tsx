import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import Text from '#/components/text'
import { Checkbox } from '#/components/ui/checkbox'
import { useGetListPartnerQuery } from '#/services/query/services/list-partner'
import { useBookingStore } from '#/stores/booking-store'
import { ServiceCard } from '../ServiceCard'
import SearchBar from '#/components/SearchBar'
import { useGetListAddonServicesByBranchQuery } from '#/services/query/services/list-addon-services-by-branch'

export function ServiceStep() {
  const { serviceIds, setData, branch, servicePartners } = useBookingStore()
  const [search, setSearch] = useState('')

  const { data: addonServices } = useGetListAddonServicesByBranchQuery({
    params: {
      branchId: branch?.branchId ?? 0,
    },
    enabled: !!branch?.branchId,
  })

  const addonServiceIds = useMemo(
    () => (addonServices?.data ?? []).map((service) => service.id),
    [addonServices?.data],
  )

  /** Chỉ auto-select all khi branch + danh sách addon thay đổi — tránh chọn lại hết khi user bỏ tick hết. */
  const lastAutoSelectKeyRef = useRef<string | null>(null)

  useEffect(() => {
    if (!branch?.branchId || !addonServiceIds.length) return

    const key = `${String(branch.branchId)}:${addonServiceIds.join(',')}`
    if (lastAutoSelectKeyRef.current === key) return

    lastAutoSelectKeyRef.current = key
    setData({ serviceIds: [...addonServiceIds] })
  }, [branch?.branchId, addonServiceIds, setData])

  const { data: { data: partners } = { data: [] } } = useGetListPartnerQuery({
    params: {},
  })

  const filteredPartners = useMemo(() => {
    const list = partners ?? []
    const byAddon = list.filter((partner) =>
      serviceIds.includes(partner.addonServiceId),
    )
    const q = search.trim().toLowerCase()
    if (!q) return byAddon
    return byAddon.filter((p) => {
      const name = (p.name ?? '').toLowerCase()
      const typeName = (p.typeName ?? '').toLowerCase()
      const addonServiceName = (p.addonServiceName ?? '').toLowerCase()
      return (
        name.includes(q) || typeName.includes(q) || addonServiceName.includes(q)
      )
    })
  }, [partners, serviceIds, search])

  /** Bỏ partner đã chọn nếu user bỏ tick addon tương ứng. */
  useEffect(() => {
    if (!servicePartners?.length) return
    const next = servicePartners.filter((p) =>
      serviceIds.includes(p.addonServiceId),
    )
    if (next.length === servicePartners.length) return
    setData({ servicePartners: next })
  }, [serviceIds, servicePartners, setData])

  return (
    <div className="flex min-w-0 w-full flex-col gap-[16px] px-[16px]">
      <SearchBar
        placeholder="Search for services"
        value={search}
        onSearch={(value) => setSearch(value)}
        onClear={() => setSearch('')}
      />

      <div className="flex max-w-full flex-wrap gap-x-[16px] gap-y-[12px]">
        {addonServices?.data?.map((service, index) => (
          <Fragment key={service.id}>
            <div className="flex shrink-0 items-center gap-[12px]">
              <Checkbox
                className="w-[20px] h-[20px] text-white border-secondary/20"
                checked={serviceIds.includes(service.id)}
                onClick={() => {
                  if (serviceIds.includes(service.id)) {
                    setData({
                      serviceIds: serviceIds.filter((s) => s !== service.id),
                    })
                  } else {
                    setData({
                      serviceIds: [...serviceIds, service.id],
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

      {filteredPartners.length > 0 && (
        <>
          {filteredPartners.map((partner) => {
            const pickedForAddon = servicePartners?.find(
              (p) => p.addonServiceId === partner.addonServiceId,
            )
            const selectionDisabled =
              pickedForAddon != null && pickedForAddon.id !== partner.id

            return (
            <ServiceCard
              key={partner.id}
              service={partner}
              selected={
                servicePartners?.some((p) => p.id === partner.id) ?? false
              }
              disabled={selectionDisabled}
              onClick={() => {
                const current = servicePartners ?? []
                const already = current.some((p) => p.id === partner.id)

                if (already) {
                  setData({
                    servicePartners: current.filter((p) => p.id !== partner.id),
                  })
                  return
                }

                // Mỗi addon service chỉ 1 partner: bỏ partner khác cùng addonServiceId rồi chọn partner này
                const withoutSameAddon = current.filter(
                  (p) => p.addonServiceId !== partner.addonServiceId,
                )
                setData({
                  servicePartners: [...withoutSameAddon, partner],
                })
              }}
            />
            )
          })}
        </>
      )}
    </div>
  )
}
