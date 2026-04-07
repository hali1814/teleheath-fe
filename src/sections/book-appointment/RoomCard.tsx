import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { cn } from '#/lib/utils'
import type { Room } from '#/services/query/branch/list-room'

export function RoomCard({
  className,
  selected = false,
  onClick,
  room,
}: {
  className?: string
  selected?: boolean
  onClick?: () => void
  room: Room
}) {
  const borderColor = selected ? 'border-primary' : 'border-dust-red-1'
  const { name, doctors } = room

  const doctor = doctors[0]

  return (
    <div
      className={cn(
        'flex gap-[12px] px-[16px] py-[20px] rounded-[12px] bg-white border border-transparent',
        borderColor,
      )}
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col gap-[12px]">
        <Text className="font-medium leading-normal text-[#333333]">
          {name}
        </Text>
        <div className="flex items-start gap-[8px]">
          <Icon name="doctor_male" className="w-[16px] h-[16px] text-icon" />
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            {doctor?.name}
          </Text>
        </div>
      </div>
      {selected ? (
        <Icon
          name="check_circle_solid"
          className="w-[20px] h-[20px] text-primary"
        />
      ) : (
        <div className="w-[20px] h-[20px] rounded-full border border-[#D3313133]" />
      )}
    </div>
  )
}
