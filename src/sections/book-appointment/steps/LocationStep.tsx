import Text from '#/components/text'
import { useGetListBranchesQuery } from '#/services/query/hospital/list-branches'
import { useBookingStore } from '#/stores/booking-store'
import { LocationCard } from '../LocationCard'

export function LocationStep() {
  const { branch, setData, hospitalId } = useBookingStore()

  console.log(hospitalId)
  const { data: { data: branches } = { data: [] } } = useGetListBranchesQuery({
    params: {
      hospitalId: hospitalId ?? '',
    },
    enabled: !!hospitalId,
  })

  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Location
      </Text>
      {branches.length > 0 &&
        branches.map((item) => (
          <LocationCard
            key={item.branchId}
            selected={branch?.branchId === item.branchId}
            onClick={() => setData({ branch: item })}
            {...item}
          />
        ))}
    </div>
  )
}
