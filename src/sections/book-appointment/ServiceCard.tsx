import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Switch } from '#/components/ui/switch'
import { cn } from '#/lib/utils'
import type { Amenity, ServiceType } from '#/types/service'
import type { SelectedAddon } from '#/stores/booking-store'
import {
  DATA_TYPE,
  DEFAULT_MAX_QUANTITY,
  isCarDataType,
  TRIP_TYPE,
} from '#/const/addon'
import { formatPrice } from '#/utils/price.util'
import { useTranslation } from 'react-i18next'
import { QuantityStepper } from './QuantityStepper'

export const ServiceCard = ({
  service,
  selected,
  selectedAddon,
  disabled = false,
  onClick,
  onDetailClick,
  onEditClick,
  onQuantityChange,
  onTripTypeChange,
}: {
  service: ServiceType
  selected: boolean
  /** Bản ghi đã chọn (kèm quantity/tripType) — có khi `selected`. */
  selectedAddon?: SelectedAddon
  disabled?: boolean
  onClick: () => void
  onDetailClick: () => void
  /** CR-02: hotel đã chọn → link "Edit your selection" mở lại bottom modal. */
  onEditClick?: () => void
  onQuantityChange?: (next: number) => void
  onTripTypeChange?: (next: 1 | 2) => void
}) => {
  const { t } = useTranslation(['book-appointment'])
  const { typeName, originalPrice, promotionPrice, price, amenities, isBest } =
    service

  const dataTypeCode = service.dataTypeCode
  const isCar = isCarDataType(dataTypeCode)
  const isCombo = dataTypeCode === DATA_TYPE.COMBO
  const isHotel = dataTypeCode === DATA_TYPE.HOTEL
  const tripType = selectedAddon?.tripType ?? TRIP_TYPE.ROUND_TRIP
  const quantity = selectedAddon?.quantity ?? 1
  const maxQuantity = service.maxQuantity ?? DEFAULT_MAX_QUANTITY

  // CR-02 + BA: giá vé xe theo từng chiều — promotion là promotion, gốc là gốc (BE trả sao hiện vậy).
  //   one way   → gốc = price,                    promo = promotionPrice
  //   round trip→ gốc = originalPrice2 (↩ price),  promo = promotionPrice2
  // Coi là KM khi có promo (>= 0, KM không có số âm) và promo < gốc; ngược lại chỉ hiện gốc.
  // promo = 0 là KM hợp lệ (miễn phí) → vẫn hiện $0 + gốc gạch ngang.
  const isRoundTrip = tripType === TRIP_TYPE.ROUND_TRIP
  const carOriginal = isRoundTrip ? service.originalPrice2 : service.price
  const carPromo = isRoundTrip ? service.promotionPrice2 : service.promotionPrice
  const carHasDiscount =
    carPromo != null &&
    carPromo >= 0 &&
    carOriginal != null &&
    carOriginal > carPromo

  const hasActiveDiscount =
    promotionPrice != null && originalPrice > promotionPrice

  // Hiển thị stepper: xe (01/05) & combo (03). Phiên dịch/hotel không có stepper ở card.
  const showStepper = isCar || isCombo

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
      <div className="h-full flex flex-col gap-[8px] p-[12px]">
        <div className="flex-1 flex flex-col gap-[8px]">
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
                {t('serviceStep.referencePrice')}
              </Text>
              {isCar ? (
                // CR-02: vé xe — có KM (promo < gốc): promo + gốc gạch ngang; ngược lại: chỉ gốc
                carHasDiscount ? (
                  <div className="flex flex-wrap items-center gap-x-[8px] gap-y-[4px]">
                    <Text
                      size="lg_16"
                      className="leading-[22px] font-medium text-[#EC5B13]"
                    >
                      {formatPrice(carPromo)}
                    </Text>
                    <Text
                      size="lg_16"
                      className="leading-[22px] font-medium text-muted-foreground line-through"
                    >
                      {formatPrice(carOriginal)}
                    </Text>
                  </div>
                ) : (
                  <Text
                    size="lg_16"
                    className="leading-[22px] font-medium text-[#EC5B13]"
                  >
                    {carOriginal && carOriginal !== 0
                      ? formatPrice(carOriginal)
                      : 'Contact later'}
                  </Text>
                )
              ) : hasActiveDiscount ? (
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
                *{t('serviceStep.distanceFromHospital')}
              </Text>
              <Text
                size="sm_12"
                className="leading-[1.2] font-medium text-muted-foreground"
              >
                {service.partner.distanceFromHospital}
              </Text>
            </div>
          )}

          {/* CR-02: toggle Round Trip cho vé xe (01/05) */}
          {selected && isCar && (
            <div
              className="flex items-center gap-[8px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Switch
                className="data-checked:bg-[#388E3C]"
                checked={tripType === TRIP_TYPE.ROUND_TRIP}
                onCheckedChange={(checked) =>
                  onTripTypeChange?.(
                    checked ? TRIP_TYPE.ROUND_TRIP : TRIP_TYPE.ONE_WAY,
                  )
                }
              />
              <Text size="sm_12" className="leading-[1.2] font-medium">
                {t('serviceStep.roundTrip')}
              </Text>
            </div>
          )}

          {/* CR-01: stepper số lượng cho xe (01/05) & combo (03) */}
          {selected && showStepper && (
            <QuantityStepper
              value={quantity}
              max={maxQuantity}
              onChange={(next) => onQuantityChange?.(next)}
            />
          )}
        </div>
        {/* CR-02: hotel đã chọn → link Edit ở phía trên nút, mở lại bottom modal để sửa */}
        {selected && isHotel && (
          <button
            type="button"
            className="self-center"
            onClick={(e) => {
              e.stopPropagation()
              onEditClick?.()
            }}
          >
            <Text
              size="sm_12"
              className="leading-[1.3] font-medium text-[#475569] underline"
            >
              {t('serviceStep.editYourSelection')}
            </Text>
          </button>
        )}
        <button
          className={cn(
            'w-full flex items-center justify-center gap-[8px] h-[28px] bg-dust-red-1 rounded-[6px]',
            selected && 'bg-primary',
          )}
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          {selected && <Icon name="check" className="size-[12px] text-white" />}
          <Text
            size="sm_12"
            className={cn(
              'leading-[1.3] font-medium text-primary',
              selected && 'text-white',
            )}
          >
            {selected
              ? t('serviceStep.selectedService')
              : t('serviceStep.selectService')}
          </Text>
        </button>
      </div>
      {isBest && (
        <div className="absolute top-0 left-0 z-50 px-[8px] py-[4px] bg-[#BD001A] rounded-tl-[8px] rounded-br-[12px]">
          <Text
            size="xs_10"
            className="leading-[15px] font-semibold text-white uppercase"
          >
            {t('serviceStep.bestService')}
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
