import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import { formatPrice } from '#/utils/price.util'

export default function InformationDetail() {
  return (
    <>
      <Text size="2xl_20" className="font-semibold leading-normal">
        General Check-up
      </Text>
      <div className="flex items-center justify-between">
        <Text
          size="4xl_24"
          className="font-semibold leading-normal text-primary"
        >
          {formatPrice(179)}
        </Text>
        <LocationBadge
          location="Vietnam"
          className="text-muted-foreground leading-normal"
          textSize="base_14"
        />
      </div>
      <Text size="base_14" className="leading-normal text-text-tertiary">
        Complete blood work, advanced diagnostic imaging, comprehensive heart
        screening with cardiologist review, liver and kidney function tests, and
        specialist consultation. A comprehensive medical checkup package
        designed to provide a detailed and thorough assessment of your health
        and overall well-being. This premium package features advanced
        screenings and dedicated support throughout your visit, ensuring a
        seamless and high-quality healthcare experience.
      </Text>
    </>
  )
}
