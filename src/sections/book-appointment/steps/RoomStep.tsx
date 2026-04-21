import Text from '#/components/text'
import { useBookingStore } from '#/stores/booking-store'
import LoadingState from '#/components/LoadingState'
import { useGetListRoomQuery } from '#/services/query/branch/list-room'
import { EmptyState } from '#/sections/search'
import { useTranslation } from 'react-i18next'
import { RoomCard } from '../RoomCard'
import { useEffect } from 'react'
import PullToRefresh from '#/components/PullToRefresh'

export type Type = 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

export function RoomStep({ type }: { type: Type }) {
  const { t } = useTranslation(['book-appointment'])
  const { branch, room, setData, specialty, next } = useBookingStore()

  const {
    data: rooms,
    isLoading,
    refetch,
  } = useGetListRoomQuery({
    params: {
      branchId: branch?.branchId ?? 0,
      specialtyId: specialty?.id ?? undefined,
    },
    enabled: !!branch?.branchId && !!specialty?.id && type === 'HOSPITAL',
  })

  useEffect(() => {
    if (!rooms || rooms.length !== 1) return

    const only = rooms[0]
    if (room?.id === only.id) return

    setData({
      room: only,
      doctor: only.doctors[0]
        ? {
            doctorId: String(only.doctors[0].doctorId),
            nameVi: only.doctors[0].name,
            avatarUrl: only.doctors[0].photoUrl,
          }
        : undefined,
    })
    next()
  }, [rooms, room, setData, next])

  useEffect(() => {
    if (!rooms || !room) return
    const hasSelectedRoomInCurrentBranch = rooms.some(
      (item) => item.id === room.id,
    )
    if (hasSelectedRoomInCurrentBranch) return

    setData({
      room: undefined,
      doctor: undefined,
      appointmentDate: undefined,
      startTime: undefined,
      endTime: undefined,
    })
  }, [rooms, room, setData])

  if (!rooms) return <EmptyState>No rooms found</EmptyState>

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col gap-[16px] px-[16px]">
        <Text
          size="lg_16"
          className="font-semibold leading-[1.2] text-[#333333]"
        >
          {t('roomStep.title')}
        </Text>
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            {rooms?.length > 0 &&
              rooms?.map((item) => (
                <RoomCard
                  key={String(item.id)}
                  selected={room?.id === item.id}
                  onClick={() =>
                    setData({
                      room: item,
                      doctor: item.doctors[0]
                        ? {
                            doctorId: String(item.doctors[0].doctorId),
                            nameVi: item.doctors[0].name,
                            avatarUrl: item.doctors[0].photoUrl,
                          }
                        : undefined,
                    })
                  }
                  room={item}
                />
              ))}
          </>
        )}
      </div>
    </PullToRefresh>
  )
}
