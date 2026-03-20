import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import type { IconName } from './icon'
import Text from './text'
import { Link } from '@tanstack/react-router'

interface MenuItemProps {
  className?: string
  icon: IconName
  title: string
  href?: string
  variant?: 'solid' | 'outline'
  iconColor?: string
  backgroundColor?: string
  borderColor?: string
}

export default function MenuItem({
  className,
  icon,
  title,
  href,
  variant = 'solid',
  iconColor,
  backgroundColor,
  borderColor,
}: MenuItemProps) {
  const defaultBgClass = variant === 'solid' ? 'bg-primary' : ''
  const defaultBorderClass =
    variant === 'outline'
      ? 'border-[1.25px] border-[#F6D6D6] shadow-[0px_1px_6px_rgba(0,0,0,0.12)]'
      : ''

  const bgClass = backgroundColor ? '' : defaultBgClass
  const borderClass = borderColor ? '' : defaultBorderClass

  const primaryColor = '#E22A36'
  const resolvedIconColor =
    iconColor ?? (variant === 'solid' ? 'white' : primaryColor)
  return (
    <Link
      to={href}
      className={cn(
        'flex flex-col items-center justify-center gap-[8px]',
        className,
      )}
    >
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
    </Link>
  )
}
