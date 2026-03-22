import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import { formatPrice } from '#/utils/price.util'

export default function InformationDetail({
  name,
  price,
  location,
  description,
}: {
  name: string
  price: number
  location: string
  description: string
}) {
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
          location={location}
          className="text-muted-foreground leading-normal"
          textSize="base_14"
        />
      </div>
      <Text size="base_14" className="leading-normal text-text-tertiary">
        {description}
      </Text>
    </>
  )
}
