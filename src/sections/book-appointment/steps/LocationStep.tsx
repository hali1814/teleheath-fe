import Text from '#/components/text'
import { useGetListBranchesQuery } from '#/services/query/hospital/list-branches'
import { useBookingStore } from '#/stores/booking-store'
import { LocationCard } from '../LocationCard'
import { useParams } from '@tanstack/react-router'

export function LocationStep() {
  const { hospitalId } = useParams({
    from: '/app/book-appointment/hospital/(commonLayout)/$hospitalId',
  })
  const { branchId, setData } = useBookingStore()

  const { data: { data: branches } = { data: [] } } = useGetListBranchesQuery({
    params: {
      hospitalId: hospitalId,
    },
  })

  return (
    <div className="flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Location
      </Text>
      {branches.length > 0 &&
        branches.map((item) => (
          <LocationCard
            key={item.branchId}
            selected={branchId === item.branchId}
            onClick={() => setData({ branchId: item.branchId })}
            {...item}
          />
        ))}
    </div>
  )
}
