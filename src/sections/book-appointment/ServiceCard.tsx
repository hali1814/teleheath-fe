import { Icon } from '#/components/icon'
import Image from '#/components/image'
import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import type { Amenity, ServiceType } from '#/types/service'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatPrice } from '#/utils/price.util'
import { useTranslation } from 'react-i18next'

export const ServiceCard = ({
  service,
  selected,
  disabled = false,
  onClick,
  onDetailClick,
}: {
  service: ServiceType
  selected: boolean
  disabled?: boolean
  onClick: () => void
  onDetailClick: () => void
}) => {
  const { i18n } = useTranslation()
  const { typeName, originalPrice, promotionPrice, price, amenities, isBest } =
    service

  const hasActiveDiscount =
    promotionPrice != null && originalPrice > promotionPrice

  return (
    <div
      className={cn(
        'relative flex flex-col gap-[12px] px-[16px] py-[12px] rounded-[12px] bg-white border border-[#D331311A]',
        selected && 'border-[#ED2630] shadow-[0_0_0_1px_#ED2630]',
        disabled &&
          'opacity-50 pointer-events-none cursor-not-allowed select-none',
      )}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return
        onClick()
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <Avatar>
            <AvatarImage
              src={service.partner.photoUrl}
              alt={service.partner.name}
            />
          </Avatar>
          <Text
            size="xs_10"
            className="font-extrabold leading-[1.2] text-muted-foreground"
          >
            {service.partner.name}
          </Text>
        </div>
        <button
          type="button"
          className="flex items-center gap-[4px] px-[8px] py-[6px] rounded-[6px] bg-dust-red-1"
          onClick={(e) => {
            e.stopPropagation()
            onDetailClick()
          }}
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
      {price !== 0 && price && (
        <div className="flex justify-between items-center">
          <Text
            size="xs_10"
            className="leading-[15px] tracking-[1px] text-[#707977]"
          >
            Price around
          </Text>
          {hasActiveDiscount ? (
            <div className="flex items-center gap-[8px]">
              <Text
                size="sm_12"
                className="leading-[1.2] font-extrabold text-[#E22A36]"
              >
                {formatPrice(promotionPrice)}
              </Text>
              <Text
                size="sm_12"
                className="leading-[1.2] font-extrabold text-muted-foreground line-through"
              >
                {originalPrice !== 0 && originalPrice
                  ? formatPrice(originalPrice)
                  : 'Contact later'}
              </Text>
            </div>
          ) : (
            <Text
              size="sm_12"
              className="leading-[1.2] font-extrabold text-[#00322D]"
            >
              {originalPrice !== 0 && originalPrice
                ? formatPrice(originalPrice)
                : 'Contact later'}
            </Text>
          )}
        </div>
      )}
      {service.partner.distanceFromHospital && (
        <div className="flex justify-between items-center">
          <Text
            size="xs_10"
            className="leading-[15px] tracking-[1px] text-[#707977]"
          >
            Distance from hospital
          </Text>
          <Text
            size="sm_12"
            className="leading-[1.2] font-extrabold text-[#00322D]"
          >
            {service.partner.distanceFromHospital}
          </Text>
        </div>
      )}
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
          location={getLocalizedTextByLang(
            service.partner.country[0].nameVi,
            null,
            service.partner.country[0].nameEn,
            i18n.language as AppLanguage,
          )}
          textSize="xs_10"
          className="leading-[1.3] text-muted-foreground"
          iconSize="w-[14px] h-[14px]"
        />
      </div>
      {isBest && (
        <div className="absolute -top-2.5 left-0">
          <Image
            src="/best-service.svg"
            alt="Best service"
            className="h-[23px] object-contain"
          />
        </div>
      )}
      {selected && (
        <div
          className="absolute -right-[0.5px] -top-[0.5px] w-[55px] h-[33px] [clip-path:polygon(100%_0,0_0,100%_100%)] 
        bg-primary flex items-start justify-end p-[6px] rounded-tr-[12px]"
        >
          <Icon name="check" className="size-[12px] text-white" />
        </div>
      )}
    </div>
  )
}
