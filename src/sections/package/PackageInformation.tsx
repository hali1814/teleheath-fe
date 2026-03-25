import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import type { Package } from '#/types/package'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatPrice } from '#/utils/price.util'
import { useTranslation } from 'react-i18next'

export default function InformationDetail({
  name,
  price,
  description,
  countries,
}: Pick<Package, 'name' | 'price' | 'description' | 'countries'>) {
  const { i18n } = useTranslation()

  return (
    <>
      <Text size="2xl_20" className="font-semibold leading-normal">
        {name}
      </Text>
      <div className="flex items-center justify-between">
        <Text
          size="4xl_24"
          className="font-semibold leading-normal text-primary"
        >
          {formatPrice(price)}
        </Text>
        <LocationBadge
          location={getLocalizedTextByLang(
            countries?.[0]?.nameVi ?? '',
            null,
            countries?.[0]?.nameEn ?? '',
            i18n.language as AppLanguage,
          )}
          className="text-muted-foreground leading-normal"
          textSize="base_14"
          iconSize="w-[20px] h-[20px]"
        />
      </div>
      <Text size="base_14" className="leading-normal text-text-tertiary">
        {description}
      </Text>
    </>
  )
}
