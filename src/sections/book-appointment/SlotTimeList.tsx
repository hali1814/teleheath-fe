import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import type { Doctor } from '#/types/doctor'
import { useCallback } from 'react'

const SlotTimeChip = ({
  time,
  selected = false,
  disabled = false,
  onClick,
}: {
  time: string
  selected?: boolean
  disabled?: boolean
  onClick: () => void
}) => {
  return (
    <Badge
      className={cn(
        'h-[38px] w-full min-w-0 flex items-center justify-center gap-[8px] rounded-[7px] border-[0.5px] border-primary bg-dust-red-1 px-[8px] py-[12px]',
        selected && 'bg-primary border-primary',
        disabled && 'cursor-not-allowed bg-[#F2F2F2] border-[#CCCCCC]',
      )}
      onClick={() => !disabled && onClick()}
    >
      <Text
        size="sm_12"
        className={cn(
          'font-normal leading-[1.3] text-center truncate w-full',
          selected ? 'text-white' : 'text-primary',
          disabled && 'text-[#CCCCCC]',
        )}
      >
        {time}
      </Text>
    </Badge>
  )
}

interface SlotTime {
  startTime: string
  endTime: string
  doctor: Partial<Doctor>
  status: 'AVAILABLE' | 'FULL'
}

export function SlotTimeList({
  title,
  selectedSlot,
  setSelectedSlot,
  slotTimes,
}: {
  title: string
  selectedSlot?: SlotTime
  setSelectedSlot: (slot?: SlotTime | undefined) => void
  slotTimes: SlotTime[]
}) {
  const isSelected = useCallback(
    (slot: SlotTime) => {
      return (
        selectedSlot?.startTime === slot.startTime &&
        selectedSlot?.endTime === slot.endTime &&
        selectedSlot?.doctor?.doctorId === slot.doctor?.doctorId
      )
    },
    [selectedSlot],
  )

  return (
    <div className="flex flex-col gap-[14px] pt-[8px]">
      <Text
        size="sm_12"
        className="font-medium leading-[1.3] text-[#999999] uppercase"
      >
        {title}
      </Text>
      <div className="grid grid-cols-3 gap-[14px]">
        {slotTimes.map((item) => (
          <SlotTimeChip
            key={`${item.startTime}-${item.endTime}`}
            time={`${item.startTime} - ${item.endTime}`}
            disabled={item.status !== 'AVAILABLE'}
            selected={selectedSlot ? isSelected(item) : false}
            onClick={() =>
              setSelectedSlot(
                selectedSlot && isSelected(item) ? undefined : item,
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
