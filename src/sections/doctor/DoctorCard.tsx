import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import LocationBadge from '#/components/LocationBadge'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'

export default function DoctorCard({
  className,
  avatar,
  name,
  location,
  specialization,
}: {
  className?: string
  avatar: string
  name: string
  location: string
  specialization: string
}) {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center gap-[16px] shrink-0 rounded-[12px] border-none bg-white p-[16px]',
        className,
      )}
    >
      <Avatar className="w-[86px] h-[86px]">
        <AvatarImage src={avatar} alt="doctor-card" />
        {/* <AvatarFallback>
          <Icon name="call_doctor" className="w-[24px] h-[24px]" />
        </AvatarFallback> */}
      </Avatar>
      <div className="w-full flex flex-col items-center gap-[8px]">
        <LocationBadge
          location={location}
          className="text-muted-foreground leading-[1.3]"
          textSize="xs_10"
        />
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {name}
        </Text>
        <Text
          size="xs_10"
          className="font-medium text-muted-foreground leading-normal"
        >
          {specialization}
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
