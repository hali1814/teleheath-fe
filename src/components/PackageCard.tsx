import { Button } from './ui/button'
import LocationBadge from './LocationBadge'
import { cn } from '#/lib/utils'
import { formatPrice } from '#/utils/price.util'

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
      <img
        src={thumbnail}
        alt="package-card"
        className="w-[108px] h-[108px] object-cover rounded-[8px] border border-[#E2E8F0]"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold">{name}</h3>
        <LocationBadge
          location={location}
          className="text-[12px] text-[#64748B]"
        />
        <span className="text-[16px] font-semibold text-primary">
          {formatPrice(price)}
        </span>
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
