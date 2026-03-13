import { cn } from '#/lib/utils'

export default function LocationBadge({
  className,
  location,
  disabled = false,
}: {
  className?: string
  location: string
  disabled?: boolean
}) {
  const textColor = disabled ? 'text-primary/50' : 'text-primary'

  return (
    <div className="flex items-center gap-[6px]">
      <img
        src="/icons/map-marker.svg"
        alt="location"
        className="w-[10px] h-[10px]"
      />
      <span className={cn(textColor, className)}>{location}</span>
    </div>
  )
}
