import SearchBar from '#/components/SearchBar'
import Text from '#/components/text'
import { ALL_PAGINATION } from '#/const/pagination'
import { SpecialtyChip } from '#/sections/hospital/SpecialtyChip'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { useBookingStore } from '#/stores/booking-store'

export function SpecialtyStep() {
  const { specialtyId, setData } = useBookingStore()

  const {
    data: { data: { content: specialties } } = {
      data: { content: [] },
    },
  } = useGetListSpecialtyQuery({
    params: ALL_PAGINATION,
  })

  return (
    <div className="flex flex-col gap-[16px]">
      <SearchBar placeholder="Search specialty" />
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Specialty
      </Text>
      <div className="flex flex-wrap gap-2">
        {specialties &&
          specialties.map((item) => (
            <SpecialtyChip
              key={item.id}
              name={item.name}
              icon={item.iconUrl}
              size="md"
              clickable
              selected={specialtyId === item.id}
              onClick={() => setData({ specialtyId: item.id })}
            />
          ))}
      </div>
    </div>
  )
}
