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
        'relative w-[180px] flex flex-col gap-[12px] rounded-[12px] bg-white border border-[#E2E2E2]',
        selected && 'border-[#ED2630] shadow-[0_0_0_1px_#ED2630]',
        disabled &&
          'opacity-50 pointer-events-none cursor-not-allowed select-none',
      )}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return
        onDetailClick()
      }}
    >
      <Image
        src={service.partner.photoUrl}
        alt={service.partner.name}
        className="aspect-3/2 object-cover rounded-tl-[12px] rounded-se-[12px]"
      />
      <div className="flex flex-col gap-[8px] p-[12px]">
        <Text size="sm_12" className="leading-[14px] font-semibold">
          {typeName}
        </Text>
        <div className="flex items-center flex-wrap gap-[8px]">
          {amenities &&
            amenities.map((amenity: Amenity) => (
              <Image
                src={amenity.iconUrl}
                alt={amenity.name}
                className="size-[12px] object-contain"
              />
            ))}
        </div>
        {price !== 0 && price && (
          <div className="flex flex-col">
            <Text size="xs_10" className="leading-[14px] text-[#475569]">
              Reference price
            </Text>
            {hasActiveDiscount ? (
              <div className="flex flex-wrap items-center gap-x-[8px] gap-y-[4px]">
                <Text
                  size="lg_16"
                  className="leading-[22px] font-medium text-[#EC5B13]"
                >
                  {formatPrice(promotionPrice)}
                </Text>
                <Text
                  size="lg_16"
                  className="leading-[22px] font-medium text-muted-foreground line-through"
                >
                  {originalPrice !== 0 && originalPrice
                    ? formatPrice(originalPrice)
                    : 'Contact later'}
                </Text>
              </div>
            ) : (
              <Text
                size="lg_16"
                className="leading-[22px] font-medium text-[#EC5B13]"
              >
                {originalPrice !== 0 && originalPrice
                  ? formatPrice(originalPrice)
                  : 'Contact later'}
              </Text>
            )}
          </div>
        )}
        {service.partner.distanceFromHospital && (
          <div className="flex flex-col">
            <Text size="xs_10" className="leading-[14px] text-[#475569]">
              *Distance from hospital
            </Text>
            <Text
              size="sm_12"
              className="leading-[1.2] font-medium text-muted-foreground"
            >
              {service.partner.distanceFromHospital}
            </Text>
          </div>
        )}
        <button
          className="w-full h-[28px] bg-dust-red-1 rounded-[6px]"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          <Text size="sm_12" className="leading-[1.3] font-medium text-primary">
            Select
          </Text>
        </button>
      </div>
      {isBest && (
        <div className="absolute top-0 left-0 z-50 px-[8px] py-[4px] bg-[#BD001A] rounded-tl-[8px] rounded-br-[12px]">
          <Text
            size="xs_10"
            className="leading-[15px] font-semibold text-white uppercase"
          >
            Best service
          </Text>
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
