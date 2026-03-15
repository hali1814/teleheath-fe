import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import type { IconName } from './icon'
import Text from './text'

interface MenuItemProps {
  icon: IconName
  title: string
  variant?: 'default' | 'outline'
  iconColor?: string
  backgroundColor?: string
  borderColor?: string
}

export default function MenuItem({
  icon,
  title,
  variant = 'default',
  iconColor,
  backgroundColor,
  borderColor,
}: MenuItemProps) {
  const defaultBgClass = variant === 'default' ? 'bg-primary' : ''
  const defaultBorderClass =
    variant === 'outline'
      ? 'border-[1.25px] border-[#F6D6D6] shadow-[0px_1px_6px_rgba(0,0,0,0.12)]'
      : ''

  const bgClass = backgroundColor ? '' : defaultBgClass
  const borderClass = borderColor ? '' : defaultBorderClass

  const primaryColor = '#E22A36'
  const resolvedIconColor =
    iconColor ?? (variant === 'default' ? 'white' : primaryColor)
  return (
    <div className="flex flex-col items-center justify-center gap-[8px]">
      <div
        className={cn(
          'w-[56px] h-[56px] rounded-[16px] flex items-center justify-center',
          bgClass,
          borderClass,
        )}
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
      >
        <Icon
          name={icon}
          className="w-[28px] h-[28px]"
          color={resolvedIconColor}
        />
      </div>
      <Text size="sm_12" className="font-medium text-center">
        {title}
      </Text>
    </div>
  )
}
