import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { slotTimesMorning } from '#/mockData'

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
        'h-[38px] flex items-center justify-center gap-[8px] rounded-[7px] border-[0.5px] border-primary bg-dust-red-1 px-[16px] py-[12px]',
        selected && 'bg-primary border-primary',
        disabled && 'cursor-not-allowed bg-[#F2F2F2] border-[#CCCCCC]',
      )}
      onClick={onClick}
    >
      <Text
        size="sm_12"
        className={cn(
          'font-normal leading-[1.3]',
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
  selectedTimes,
  setSelectedTimes,
}: {
  title: string
  selectedTimes: string[]
  setSelectedTimes: (times: string[]) => void
}) {
  return (
    <div className="flex flex-col gap-[14px] pt-[8px]">
      <Text
        size="sm_12"
        className="font-medium leading-[1.3] text-[#999999] uppercase"
      >
        {title}
      </Text>
      <div className="flex flex-wrap justify-between gap-[14px]">
        {slotTimesMorning.map((item) => (
          <SlotTimeChip
            key={item.time}
            time={item.time}
            selected={selectedTimes.includes(item.time)}
            disabled={item.disabled}
            onClick={() => {
              if (selectedTimes.includes(item.time)) {
                setSelectedTimes(selectedTimes.filter((t) => t !== item.time))
              } else {
                setSelectedTimes([...selectedTimes, item.time])
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
