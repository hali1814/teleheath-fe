import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import Image from '#/components/image'
import LocationBadge from '#/components/LocationBadge'
import { Button } from '#/components/ui/button'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import type { Hospital } from '#/types/hospital'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

type HospitalCardProps = {
  className?: string
  size?: 'sm' | 'md'
  variantButton?: 'outline' | 'solid'
  showBadge?: boolean
  hideBookAppointment?: boolean
  showAddress?: boolean
} & Hospital

export default function HospitalCard({
  className,
  size = 'sm',
  variantButton = 'outline',
  showBadge = false,
  hideBookAppointment = false,
  showAddress = false,
  ...hospital
}: HospitalCardProps) {
  const { hospitalId, nameVi, nameEn, nameKh, country, thumbnailUrl, address } =
    hospital
  const { t, i18n } = useTranslation(['common'])
  const imgHeight = size === 'sm' ? 'h-[96px]' : 'h-[180px]'
  const textSize = size === 'sm' ? 'sm_12' : 'lg_16'
  const gap = size === 'sm' ? 'gap-[8px]' : 'gap-[10px]'
  const bgColor = variantButton === 'solid' ? 'bg-primary' : 'bg-dust-red-1'
  const textColor = variantButton === 'solid' ? 'text-white' : 'text-primary'
  const iconColor = variantButton === 'solid' ? 'white' : 'var(--primary)'
  const textSizeLocation = size === 'sm' ? 'xs_10' : 'sm_12'
  const heightButton = size === 'sm' ? 'h-[32px]' : 'h-[36px]'

  return (
    <Link
      to="/app/hospital/$id"
      params={{ id: hospitalId }}
      className={cn(
        'w-full flex flex-col shrink-0 rounded-[12px] border-none bg-white',
        className,
      )}
    >
      <Image
        src={thumbnailUrl ?? ''}
        alt="hospital-card"
        className={cn('w-full rounded-tl-[12px] rounded-tr-[12px]', imgHeight)}
      />
      <div className={cn('flex-1 flex flex-col justify-between p-[12px]', gap)}>
        <div className={cn('flex flex-col', gap)}>
          <div className="flex items-start justify-between">
            <Text
              size={textSize}
              className={cn(
                'font-semibold leading-[1.2]',
                size === 'sm' ? 'truncate' : '',
              )}
            >
              {getLocalizedTextByLang(
                nameVi,
                nameKh,
                nameEn,
                i18n.language as AppLanguage,
              )}
            </Text>
            {showBadge && (
              <Badge className="bg-[#DCFCE7] text-[#15803D] px-[8px] py-[4px] rounded-[6px]">
                Open 24/7
              </Badge>
            )}
          </div>
          <LocationBadge
            location={
              showAddress
                ? address
                : getLocalizedTextByLang(
                    country.nameVi,
                    null,
                    country.nameEn,
                    i18n.language as AppLanguage,
                  )
            }
            className="text-muted-foreground leading-[1.3]"
            textSize={textSizeLocation}
          />
        </div>
        {!hideBookAppointment && (
          <Button className={cn('w-full', heightButton, bgColor)} asChild>
            <Link
              to="/app/book-appointment/hospital/$hospitalId"
              params={{ hospitalId }}
            >
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
            </Link>
          </Button>
        )}
      </div>
    </Link>
  )
}
