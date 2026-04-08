import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import type { Package } from '#/entities/packageEntity'
import { formatPrice } from '#/utils/price.util'

export default function InformationDetail({
  name,
  price,
  description,
  countryName,
}: Pick<Package, 'name' | 'price' | 'description' | 'countryName'>) {
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
          location={countryName}
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
