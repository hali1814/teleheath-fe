import Text from '#/components/text'
import { locations } from '#/mockData'
import { useBookingStore } from '#/stores/booking-store'
import { LocationCard } from '../LocationCard'

export function LocationStep() {
  const { location, setData } = useBookingStore()

  return (
    <div className="flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Location
      </Text>
      {locations.map((item) => (
        <LocationCard
          key={item.name}
          location={item.name}
          address={item.address}
          selected={location === item.name}
          onClick={() => setData({ location: item.name })}
        />
      ))}
    </div>
  )
}
