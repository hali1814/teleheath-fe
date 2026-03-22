import Image from '#/components/image'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'

export const SpecialtyChip = ({
  name,
  icon,
  size = 'sm',
  clickable = false,
  selected = false,
  onClick,
}: {
  name: string
  icon: string
  size?: 'sm' | 'md'
  clickable?: boolean
  selected?: boolean
  onClick?: () => void
}) => {
  const sizeClass = size === 'sm' ? 'h-[32px]' : 'h-[40px]'
  const textSize = size === 'sm' ? 'sm_12' : 'base_14'
  const textStyle = size === 'sm' ? 'font-medium' : 'font-normal leading-normal'
  const textColor = selected ? 'text-white' : 'text-primary'
  const roundedClass = size === 'sm' ? 'rounded-[12px]' : 'rounded-[30px]'
  const paddingHorizontalClass = size === 'sm' ? 'px-[16px]' : 'px-[20px]'
  const bgColor = selected ? 'bg-primary' : 'bg-[#FFEBE9]'

  const handleClick = () => {
    if (!clickable || !onClick) return

    onClick()
  }

  return (
    <Badge
      className={cn(
        'flex gap-[8px] rounded-[12px]',
        sizeClass,
        roundedClass,
        paddingHorizontalClass,
        bgColor,
      )}
      onClick={handleClick}
    >
      <Image src={icon} alt={name} className="w-[12px] h-[12px]" />
      <Text size={textSize} className={cn(textStyle, textColor)}>
        {name}
      </Text>
    </Badge>
  )
}
