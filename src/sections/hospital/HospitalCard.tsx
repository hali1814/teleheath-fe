import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import Image from '#/components/image'
import LocationBadge from '#/components/LocationBadge'
import { Button } from '#/components/ui/button'
import Text from '#/components/text'

export default function HospitalCard({
  className,
  name,
  location,
  thumbnail,
}: {
  className?: string
  name: string
  location: string
  thumbnail: string
}) {
  return (
    <div
      className={cn(
        'w-full flex flex-col shrink-0 rounded-[12px] border-none bg-white',
        className,
      )}
    >
      <Image
        src={thumbnail}
        alt="hospital-card"
        className="w-full h-[96px] rounded-tl-[12px] rounded-tr-[12px]"
      />
      <div className="flex-1 flex flex-col justify-between gap-[8px] p-[12px]">
        <div className="flex flex-col gap-[8px]">
          <Text size="sm_12" className="font-medium">
            {name}
          </Text>
          <LocationBadge
            location={location}
            className="text-muted-foreground leading-[1.3]"
            textSize="xs_10"
          />
        </div>
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
