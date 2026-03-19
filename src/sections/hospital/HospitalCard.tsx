import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import Image from '#/components/image'
import LocationBadge from '#/components/LocationBadge'
import { Button } from '#/components/ui/button'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

export default function HospitalCard({
  className,
  name,
  location,
  thumbnail,
  size = 'sm',
  variantButton = 'outline',
  showBadge = false,
}: {
  className?: string
  name: string
  location: string
  thumbnail: string
  size?: 'sm' | 'md'
  variantButton?: 'outline' | 'solid'
  showBadge?: boolean
}) {
  const { t } = useTranslation(['common'])
  const imgHeight = size === 'sm' ? 'h-[96px]' : 'h-[180px]'
  const textSize = size === 'sm' ? 'sm_12' : 'lg_16'
  const gap = size === 'sm' ? 'gap-[8px]' : 'gap-[10px]'
  const bgColor = variantButton === 'solid' ? 'bg-primary' : 'bg-dust-red-1'
  const textColor = variantButton === 'solid' ? 'text-white' : 'text-primary'
  const iconColor = variantButton === 'solid' ? 'white' : 'var(--primary)'

  return (
    <Link
      to="/app/hospital/$id"
      params={{ id: '1' }}
      className={cn(
        'w-full flex flex-col shrink-0 rounded-[12px] border-none bg-white',
        className,
      )}
    >
      <Image
        src={thumbnail}
        alt="hospital-card"
        className={cn('w-full rounded-tl-[12px] rounded-tr-[12px]', imgHeight)}
      />
      <div className={cn('flex-1 flex flex-col justify-between p-[12px]', gap)}>
        <div className={cn('flex flex-col', gap)}>
          <div className="flex items-center justify-between">
            <Text size={textSize} className="font-medium">
              {name}
            </Text>
            {showBadge && (
              <Badge className="bg-[#DCFCE7] text-[#15803D] px-[8px] py-[4px] rounded-[6px]">
                Open 24/7
              </Badge>
            )}
          </div>
          <LocationBadge
            location={location}
            className="text-muted-foreground leading-[1.3]"
            textSize="xs_10"
          />
        </div>
        <Button className={cn('w-full h-[32px]', bgColor)}>
          <Icon
            name="book_appointment"
            color={iconColor}
            className="w-[16px] h-[16px]"
          />
          <Text
            size="sm_12"
            className={cn('font-medium leading-[1.3]', textColor)}
          >
            {t('actions.bookAppointment')}
          </Text>
        </Button>
      </div>
    </Link>
  )
}
