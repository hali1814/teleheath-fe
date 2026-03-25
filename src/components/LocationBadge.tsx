import { cn } from '#/lib/utils'
import { Icon } from './icon'
import Text, { type TextSize } from './text'

export default function LocationBadge({
  className,
  textSize = 'base_14',
  location,
  disabled = false,
  iconSize = 'w-[12px] h-[12px]',
}: {
  className?: string
  textSize?: TextSize
  location: string
  disabled?: boolean
  iconSize?: string
}) {
  const textColor = disabled ? 'text-primary/50' : 'text-primary'

  return (
    <div className="flex items-center gap-[4px]">
      <Icon
        name="map_marker"
        color={textColor}
        className={cn(iconSize, 'text-primary')}
      />
      <Text size={textSize} className={cn(textColor, className, 'flex-1')}>
        {location}
      </Text>
    </div>
  )
}
