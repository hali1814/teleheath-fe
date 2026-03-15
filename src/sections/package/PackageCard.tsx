import { Button } from '#/components/ui/button'
import LocationBadge from '#/components/LocationBadge'
import { cn } from '#/lib/utils'
import { formatPrice } from '#/utils/price.util'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import Image from '#/components/image'

export default function PackageCard({
  className,
  name,
  location,
  price,
  thumbnail,
}: {
  className?: string
  name: string
  location: string
  price: number
  thumbnail: string
}) {
  return (
    <div
      className={cn(
        className,
        'w-full flex items-center gap-4 rounded-[12px] p-[16px] bg-white',
      )}
    >
      <Image
        src={thumbnail}
        alt="package-card"
        className="w-[108px] h-[108px] rounded-[8px] border border-dust-red-1"
      />
      <div className="w-full flex flex-col gap-2">
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {name}
        </Text>
        <LocationBadge
          location={location}
          className="text-muted-foreground leading-[1.3]"
          textSize="xs_10"
        />
        <Text size="lg_16" className="font-semibold leading-[1.2] text-primary">
          {formatPrice(price)}
        </Text>
        <Button className="w-full h-[32px] bg-dust-red-1">
          <Icon
            name="book_appointment"
            color="var(--primary)"
            className="w-[16px] h-[16px]"
          />
          <Text size="sm_12" className="font-medium leading-[1.3] text-primary">
            Book Appointment
          </Text>
        </Button>
      </div>
    </div>
  )
}
