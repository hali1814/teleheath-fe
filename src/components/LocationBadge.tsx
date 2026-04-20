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

  if (location === '') {
    return null
  }

  return (
    <div className="flex items-start gap-[4px]">
      <Icon
        name="map_marker"
        color={textColor}
        className={cn(iconSize, 'text-primary')}
      />
      <Text
        size={textSize}
        className={cn(textColor, className, 'leading-[1.3] flex-1')}
      >
        {location}
      </Text>
    </div>
  )
}
