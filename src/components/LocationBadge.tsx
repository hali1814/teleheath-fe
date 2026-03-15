import { cn } from '#/lib/utils'
import { Icon } from './icon'
import Text, { type TextSize } from './text'

export default function LocationBadge({
  className,
  textSize = 'base_14',
  location,
  disabled = false,
}: {
  className?: string
  textSize?: TextSize
  location: string
  disabled?: boolean
}) {
  const textColor = disabled ? 'text-primary/50' : 'text-primary'

  return (
    <div className="flex items-center gap-[4px]">
      <Icon name="map_marker" color={textColor} className="w-[14px] h-[14px]" />
      <Text size={textSize} className={cn(textColor, className)}>
        {location}
      </Text>
    </div>
  )
}
