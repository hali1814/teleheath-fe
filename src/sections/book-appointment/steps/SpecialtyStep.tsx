import SearchBar from '#/components/SearchBar'
import Text from '#/components/text'
import { specialties } from '#/mockData'
import { SpecialtyChip } from '#/sections/hospital/SpecialtyChip'
import { useBookingStore } from '#/stores/booking-store'

export function SpecialtyStep() {
  const { specialty, setData } = useBookingStore()

  return (
    <div className="flex flex-col gap-[16px]">
      <SearchBar placeholder="Search specialty" />
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Specialty
      </Text>
      <div className="flex flex-wrap gap-2">
        {specialties.map((item) => (
          <SpecialtyChip
            key={item.name}
            name={item.name}
            icon={item.icon}
            size="md"
            clickable
            selected={specialty === item.name}
            onClick={() => setData({ specialty: item.name })}
          />
        ))}
      </div>
    </div>
  )
}
