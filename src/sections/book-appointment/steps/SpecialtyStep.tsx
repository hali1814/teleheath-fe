import SearchBar from '#/components/SearchBar'
import Text from '#/components/text'
import { ALL_PAGINATION } from '#/const/pagination'
import { SpecialtyChip } from '#/sections/hospital/SpecialtyChip'
import { EmptyState } from '#/sections/search'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { useBookingStore } from '#/stores/booking-store'
import { useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { keepPreviousData } from '@tanstack/react-query'

export function SpecialtyStep() {
  const { hospital, specialty, setData } = useBookingStore()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const {
    data: { data: { content: specialties } } = {
      data: { content: [] },
    },
  } = useGetListSpecialtyQuery({
    params: {
      ...ALL_PAGINATION,
      hospitalId: hospital?.hospitalId ?? '',
      keyword: debouncedSearch,
    },
    enabled: !!hospital?.hospitalId,
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      <SearchBar
        placeholder="Search specialty"
        value={search}
        onSearch={setSearch}
        onClear={() => setSearch('')}
      />
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Specialty
      </Text>
      <div className="flex flex-wrap gap-2">
        {specialties.length > 0 ? (
          specialties.map((item) => (
            <SpecialtyChip
              key={item.id}
              name={item.name}
              icon={item.iconUrl}
              size="md"
              clickable
              selected={specialty?.id === item.id}
              onClick={() => setData({ specialty: item })}
            />
          ))
        ) : (
          <EmptyState>
            <Text className="text-center leading-normal text-muted-foreground">
              No specialties found. Please try again.
            </Text>
          </EmptyState>
        )}
      </div>
    </div>
  )
}
