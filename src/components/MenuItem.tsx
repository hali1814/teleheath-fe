import { cn } from '#/lib/utils'

interface MenuItemProps {
  icon: string
  title: string
  variant?: 'default' | 'outline'
}

export default function MenuItem({
  icon,
  title,
  variant = 'default',
}: MenuItemProps) {
  const bgColor = variant === 'default' ? 'bg-primary' : ''
  const borderColor =
    variant === 'outline' ? 'border-[1.25px] border-primary' : ''
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'w-[56px] h-[56px] rounded-[16px] flex items-center justify-center',
          bgColor,
          borderColor,
        )}
      >
        <img
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>
      <p className="text-sm font-medium text-center text-black">{title}</p>
    </div>
  )
}
