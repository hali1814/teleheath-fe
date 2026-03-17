import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'

export default function BookingItem({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: IconName
}) {
  return (
    <div className="w-full flex items-center gap-[12px] p-[16px] rounded-[12px] bg-white">
      <div className="w-[40px] h-[40px] rounded-[8px] bg-secondary/10 flex items-center justify-center">
        <Icon name={icon} className="w-[20px] h-[20px] text-primary" />
      </div>
      <div className="flex-1 flex flex-col gap-[6px]">
        <Text className="font-medium leading-normal">{title}</Text>
        <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
          {description}
        </Text>
      </div>
      <Icon name="arrow_right" className="w-[8px] h-[14px] text-[#CCCCCC]" />
    </div>
  )
}
