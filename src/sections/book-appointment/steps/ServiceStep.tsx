import { Fragment } from 'react'

import Text from '#/components/text'
import { Checkbox } from '#/components/ui/checkbox'
import { useGetListPartnerQuery } from '#/services/query/services/list-partner'
import { useGetListServiceQuery } from '#/services/query/services/list-service'
import { useBookingStore } from '#/stores/booking-store'
import { ServiceCard } from '../ServiceCard'
import SearchBar from '#/components/SearchBar'
import { useState } from 'react'

export function ServiceStep() {
  const { serviceIds, setData } = useBookingStore()
  const [search, setSearch] = useState('')

  const { data: { data: services } = { data: [] } } = useGetListServiceQuery({
    params: {
      page: 1,
      size: 10,
    },
  })

  const { data: { data: partners } = { data: [] } } = useGetListPartnerQuery({
    params: {},
  })

  return (
    <div className="flex min-w-0 w-full flex-col gap-[16px] px-[16px]">
      <SearchBar
        placeholder="Search for services"
        value={search}
        onSearch={(value) => setSearch(value)}
        onClear={() => setSearch('')}
      />

      <div className="flex max-w-full flex-nowrap gap-[16px] overflow-x-auto  [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((service, index) => (
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
                    setData({ serviceIds: [...serviceIds, service.id] })
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
            {index < services.length - 1 && (
              <div className="w-px shrink-0 self-stretch bg-[#DFDFDF]" />
            )}
          </Fragment>
        ))}
      </div>

      {partners.length > 0 && (
        <>
          {partners.map((partner) => (
            <ServiceCard key={partner.id} service={partner} />
          ))}
        </>
      )}
    </div>
  )
}
