import { Icon } from '#/components/icon'
import Image from '#/components/image'
import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import type { Amenity, Partner } from '#/types/service'
import { formatPrice } from '#/utils/price.util'

export const ServiceCard = ({ service }: { service: Partner }) => {
  const { name, photoUrl, price, amenities, typeName, country } = service

  return (
    <div className="relative flex flex-col gap-[12px] px-[16px] py-[12px] rounded-[12px] bg-white border border-[#D331311A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <Avatar>
            <AvatarImage src={photoUrl} alt={name} />
          </Avatar>
          <Text
            size="xs_10"
            className="font-extrabold leading-[1.2] text-muted-foreground"
          >
            {name}
          </Text>
        </div>
        <button
          className="flex items-center gap-[4px] px-[8px] py-[6px] rounded-[6px] bg-dust-red-1"
          onClick={() => {}}
        >
          <Icon name="eye_outline" className="w-[16px] h-[16px] text-primary" />
          <Text size="sm_12" className="leading-[1.3] font-medium text-primary">
            Details
          </Text>
        </button>
      </div>
      <Text size="sm_12" className="leading-[1.2] font-medium">
        {typeName}
      </Text>
      <div className="flex justify-between items-center">
        <Text
          size="xs_10"
          className="leading-[15px] tracking-[1px] text-[#707977]"
        >
          Price around
        </Text>
        <Text
          size="sm_12"
          className="leading-[1.2] font-extrabold text-[#00322D]"
        >
          {formatPrice(price)}
        </Text>
      </div>
      <div className="flex items-center flex-wrap gap-[12px]">
        {amenities &&
          amenities.map((amenity: Amenity) => (
            <div
              key={amenity.name}
              className="flex items-center gap-[6px] bg-[#EDEEED] px-[12px] py-[4px] rounded-full"
            >
              <Image
                src={amenity.iconUrl}
                alt={amenity.name}
                className="w-[16px] h-[16px] object-contain"
              />
              <Text
                size="xs_10"
                className="leading-[16px] font-medium text-[#3F4947]"
              >
                {amenity.name}
              </Text>
            </div>
          ))}
      </div>
      <div className="flex justify-end">
        <LocationBadge
          location={country}
          textSize="xs_10"
          className="leading-[1.3] text-muted-foreground"
          iconSize="w-[14px] h-[14px]"
        />
      </div>
      <div className="absolute -top-2.5 left-0">
        <Image
          src="/best-service.svg"
          alt="Best service"
          className="h-[23px] object-contain"
        />
      </div>
    </div>
  )
}
