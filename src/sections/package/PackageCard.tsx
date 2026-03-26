import { Button } from '#/components/ui/button'
import LocationBadge from '#/components/LocationBadge'
import { cn } from '#/lib/utils'
import { formatPrice } from '#/utils/price.util'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import Image from '#/components/image'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import type { Package } from '#/types/package'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

type PackageCardProps = {
  className?: string
  hideBookAppointment?: boolean
  sizeThumbnail?: 'sm' | 'md'
} & Package

export default function PackageCard({
  className,
  hideBookAppointment = false,
  sizeThumbnail = 'md',
  ...packageData
}: PackageCardProps) {
  const { id, name, countries, price, imageUrl } = packageData
  const { t, i18n } = useTranslation(['common'])

  const thumbnailSize =
    sizeThumbnail === 'sm' ? 'w-[68px] h-[68px]' : 'w-[108px] h-[108px]'

  return (
    <Link
      to="/app/package/$id"
      params={{ id: id.toString() }}
      className={cn(
        className,
        'w-full flex items-center gap-4 rounded-[12px] p-[16px] bg-white',
      )}
    >
      <div>
        <Image
          src={imageUrl}
          alt={name}
          className={cn(
            thumbnailSize,
            'rounded-[8px] border border-dust-red-1',
          )}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {name}
        </Text>
        <LocationBadge
          location={getLocalizedTextByLang(
            countries[0].nameVi,
            null,
            countries[0].nameEn,
            i18n.language as AppLanguage,
          )}
          className="text-muted-foreground leading-[1.3]"
          textSize="xs_10"
        />
        <Text size="lg_16" className="font-semibold leading-[1.2] text-primary">
          {formatPrice(price)}
        </Text>
        {!hideBookAppointment && (
          <Button className="w-full h-[32px] bg-dust-red-1" asChild>
            <Link
              to="/app/book-appointment/package/$packageId"
              params={{ packageId: id.toString() }}
            >
              <Icon
                name="book_appointment"
                color="var(--primary)"
                className="w-[16px] h-[16px]"
              />
              <Text
                size="sm_12"
                className="font-medium leading-[1.3] text-primary"
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
