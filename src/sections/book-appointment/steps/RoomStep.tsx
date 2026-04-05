import Text from '#/components/text'
import { useBookingStore } from '#/stores/booking-store'
import LoadingState from '#/components/LoadingState'
import { useGetListRoomQuery } from '#/services/query/branch/list-room'
import { EmptyState } from '#/sections/search'
import { RoomCard } from '../RoomCard'

export type Type = 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

export function RoomStep({ type }: { type: Type }) {
  const { branch, room, setData, specialty, next } = useBookingStore()

  const { data: rooms, isLoading } = useGetListRoomQuery({
    params: {
      branchId: branch?.branchId ?? '',
      specialtyId: specialty?.id ?? undefined,
    },
    enabled: !!branch?.branchId && !!specialty?.id && type === 'HOSPITAL',
  })

  console.log(rooms)

  if (!rooms) return <EmptyState>No rooms found</EmptyState>

  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Room
      </Text>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {rooms?.length > 0 &&
            rooms?.map((item) => (
              <RoomCard
                key={item.id}
                selected={room?.id === item.id}
                onClick={() => setData({ room: item })}
                {...item}
              />
            ))}
        </>
      )}
    </div>
  )
}
