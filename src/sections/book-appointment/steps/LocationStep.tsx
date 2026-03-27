import Text from '#/components/text'
import { useGetListBranchesByDoctorQuery } from '#/services/query/doctor/list-branches-by-doctor'
import { useGetListBranchesQuery } from '#/services/query/hospital/list-branches'
import { useBookingStore } from '#/stores/booking-store'
import { LocationCard } from '../LocationCard'

export function LocationStep({ type }: { type: 'HOSPITAL' | 'DOCTOR' }) {
  const { branch, setData, hospital, doctor } = useBookingStore()

  const { data: { data: branches } = { data: [] } } =
    type === 'HOSPITAL'
      ? useGetListBranchesQuery({
          params: {
            hospitalId: hospital?.hospitalId ?? '',
          },
          enabled: !!hospital?.hospitalId && type === 'HOSPITAL',
        })
      : useGetListBranchesByDoctorQuery({
          params: {
            doctorId: doctor?.doctorId ?? '',
          },
          enabled: !!doctor?.doctorId && type === 'DOCTOR',
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
