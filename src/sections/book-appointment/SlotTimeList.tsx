import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'

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
      onClick={onClick}
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

export function SlotTimeList({
  title,
  selectedTime,
  setSelectedTime,
  slotTimes,
}: {
  title: string
  selectedTime: { startTime: string | null; endTime: string | null }
  setSelectedTime: (time: {
    startTime: string | null
    endTime: string | null
  }) => void
  slotTimes: {
    startTime: string
    endTime: string
    status?: 'AVAILABLE' | 'FULL'
  }[]
}) {
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
            selected={
              selectedTime.startTime !== null &&
              selectedTime.endTime !== null &&
              selectedTime.startTime === item.startTime &&
              selectedTime.endTime === item.endTime
            }
            onClick={() => {
              if (
                selectedTime.startTime !== null &&
                selectedTime.endTime !== null &&
                selectedTime.startTime === item.startTime &&
                selectedTime.endTime === item.endTime
              ) {
                setSelectedTime({ startTime: null, endTime: null })
              } else {
                setSelectedTime({
                  startTime: item.startTime,
                  endTime: item.endTime,
                })
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
