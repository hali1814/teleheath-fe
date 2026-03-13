import { cn } from '#/lib/utils'
import LocationBadge from './LocationBadge'
import { Button } from './ui/button'

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
      <img
        src={thumbnail}
        alt="hospital-card"
        className="w-full h-[96px] object-cover rounded-tl-[12px] rounded-tr-[12px]"
      />
      <div className="flex-1 flex flex-col justify-between gap-[8px] p-[12px]">
        <div className="flex flex-col gap-[8px]">
          <span className="text-[12px] font-medium">{name}</span>
          <LocationBadge
            location={location}
            className="text-[10px] text-[#64748B]"
          />
        </div>
        <Button className="w-full h-[32px] text-white text-[12px] font-medium">
          <img
            src="/icons/book-appointment.svg"
            alt="book-appointment"
            className="w-[20px] h-[20px] object-contain"
          />
          Book Appointment
        </Button>
      </div>
    </div>
  )
}
