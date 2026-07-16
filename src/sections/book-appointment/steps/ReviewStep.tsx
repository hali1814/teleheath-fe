import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import {
  useBookingStore,
  lineTotalOf,
  type SelectedAddon,
} from '#/stores/booking-store'
import {
  DATA_TYPE,
  DEFAULT_MAX_QUANTITY,
  isCarDataType,
  TRIP_TYPE,
} from '#/const/addon'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatPrice } from '#/utils/price.util'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ModalDetailService } from '../ModalDetailService'
import { First100Banner } from '../First100Banner'
import type { ServiceType } from '#/types/service'
import { Textarea } from '#/components/ui/textarea'
import { AppointmentDetailSheet } from '../AppointmentDetailSheet'
import { AddonHotelModal } from '../AddonHotelModal'
import { QuantityStepper } from '../QuantityStepper'
import { useGetFirst100BannerQuery } from '#/services/query/promotions/first100-banner'

/**
 * 1 dòng add-on trên màn Review (bám Figma 7222:4781):
 * tên gói + phụ đề chiều đi (xe) + stepper (xe/combo) hoặc "N rooms" ✏️ (hotel) + link Details.
 */
const AddonReviewRow = ({
  service,
  onDetailClick,
  onEditRooms,
}: {
  service: SelectedAddon
  onDetailClick: () => void
  onEditRooms: () => void
}) => {
  const { t } = useTranslation(['appointment', 'common'])
  const setAddonQuantity = useBookingStore((s) => s.setAddonQuantity)

  const dataType = service.dataTypeCode
  const isCar = isCarDataType(dataType)
  const isCombo = dataType === DATA_TYPE.COMBO
  const isHotel = dataType === DATA_TYPE.HOTEL
  const showStepper = isCar || isCombo
  const roomCount = service.rooms?.length ?? 0

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-start justify-between gap-[12px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <Text size="base_14" className="leading-normal text-[#1A1C1C]">
            {service.typeName}
          </Text>
          {isCar && (
            <Text size="sm_12" className="leading-[1.2] text-[#7D8590]/80">
              {service.tripType === TRIP_TYPE.ROUND_TRIP
                ? t('appointment:roundTripTicket')
                : t('appointment:oneWayTicket')}
            </Text>
          )}
        </div>

        {isHotel ? (
          <button
            type="button"
            className="flex shrink-0 items-center gap-[4px]"
            onClick={onEditRooms}
          >
            <Text size="sm_12" className="leading-[1.2] text-[#64748B]">
              {t('appointment:roomsCount', { count: roomCount })}
            </Text>
            <Icon name="pencil" className="size-[12px] text-[#64748B]" />
          </button>
        ) : showStepper ? (
          <div onClick={(e) => e.stopPropagation()}>
            <QuantityStepper
              value={service.quantity}
              max={service.maxQuantity ?? DEFAULT_MAX_QUANTITY}
              onChange={(next) => setAddonQuantity(service.id, next)}
            />
          </div>
        ) : null}
      </div>

      <button type="button" className="self-start" onClick={onDetailClick}>
        <Text size="sm_12" className="font-medium leading-[1.3] text-primary">
          {t('common:actions.details')}
        </Text>
      </button>
    </div>
  )
}

const PaymentMethodItem = ({
  logo,
  title,
  selected,
  onClick,
}: {
  logo: string
  title: string
  selected: boolean
  onClick: () => void
}) => {
  const borderColor = selected ? 'border-primary' : 'border-dust-red-1'

  return (
    <div
      className={cn(
        'flex items-center gap-[16px] px-[16px] py-[12px] rounded-[12px] bg-white border border-transparent',
        borderColor,
      )}
      onClick={onClick}
    >
      <Image
        src={logo}
        alt={title}
        className="w-[32px] h-[32px] rounded-full"
      />
      <Text className="flex-1 font-medium leading-normal text-[#333333]">
        {title}
      </Text>
      {selected ? (
        <Icon
          name="check_circle_solid"
          className="w-[20px] h-[20px] text-primary"
        />
      ) : (
        <div className="w-[20px] h-[20px] rounded-full border border-[#D3313180]" />
      )}
    </div>
  )
}

export function ReviewStep() {
  const { i18n, t } = useTranslation([
    'book-appointment',
    'appointment',
    'common',
  ])
  const [openDetailService, setOpenDetailService] = useState(false)
  const [openAppointmentDetail, setOpenAppointmentDetail] = useState(false)
  const [selectedService, setSelectedService] = useState<
    ServiceType | undefined
  >(undefined)
  const [hotelEditTarget, setHotelEditTarget] = useState<
    SelectedAddon | undefined
  >(undefined)
  const {
    branch,
    appointmentDate,
    startTime,
    endTime,
    paymentMethod,
    feeInfo,
    addonServiceTypes,
    customerNote,
    first100Banner,
    calcFeeInfo,
    setData,
  } = useBookingStore()
  const setAddonRooms = useBookingStore((s) => s.setAddonRooms)

  const consultationFee = branch?.depositFee ?? 0

  const hasPrivateCar = useMemo(
    () =>
      (addonServiceTypes ?? []).some(
        (a) => a.dataTypeCode === DATA_TYPE.PRIVATE_CAR,
      ),
    [addonServiceTypes],
  )
  const hasAddons = (addonServiceTypes?.length ?? 0) > 0

  // CR-02 §3.10: check chéo banner ở màn Review (gọi lại, không cache).
  const { data: bannerRes } = useGetFirst100BannerQuery({ staleTime: 0 })
  const reviewBanner = bannerRes?.data
  useEffect(() => {
    if (!reviewBanner) return
    // Suất KM vừa hết trong lúc user ở Review → bỏ discount + báo.
    if (!reviewBanner.show_banner && first100Banner?.show_banner) {
      toast.error(t('appointment:promoQuotaExceeded'))
    }
    setData({ first100Banner: reviewBanner })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewBanner])

  useEffect(() => {
    calcFeeInfo(consultationFee)
  }, [addonServiceTypes, calcFeeInfo, consultationFee, first100Banner])

  const paymentMethods = useMemo(
    () => [
      {
        id: 1,
        name: t('paymentMethodName.khqr'),
        logo: '/payment-method/khqr.png',
      },
    ],
    [t],
  )

  // CR-02d: ô ghi chú + dòng nhắc xe riêng (bám Figma: nằm trong card add-on).
  const renderNotes = (withDivider: boolean) => (
    <>
      {withDivider && (
        <div className="border-t border-dashed border-[#D0D0D0]" />
      )}
      <div className="flex flex-col gap-[8px]">
        <Text size="sm_12" className="leading-[1.5] text-[#64748B]">
          {t('appointment:yourRequestNotes')}
        </Text>
        <Textarea
          value={customerNote ?? ''}
          onChange={(e) => setData({ customerNote: e.target.value })}
          placeholder={t('appointment:enterYourNote')}
          className="min-h-[96px] rounded-[6px] border-[#D0D0D0] p-[12px] placeholder:text-[#7D8590]/80"
        />
        {hasPrivateCar && (
          <Text size="sm_12" className="italic leading-[1.5] text-[#2F54EB]">
            {t('appointment:privateCarNoteReminder')}
          </Text>
        )}
      </div>
    </>
  )

  return (
    <>
      <div className="flex flex-col gap-[16px] px-[16px]">
        <div className="flex flex-col gap-[16px] p-[16px] rounded-[16px] bg-white">
          <div className="flex items-center justify-between gap-[12px]">
            <Text
              size="lg_16"
              className="leading-[1.2] font-semibold text-[#0F172A]"
            >
              {t('appointment:appointmentInformation')}
            </Text>
            <button
              type="button"
              className="flex items-center gap-[4px] px-[8px] py-[6px] rounded-[6px] bg-dust-red-1"
              onClick={() => setOpenAppointmentDetail(true)}
            >
              <Icon
                name="eye_outline"
                className="w-[16px] h-[16px] text-primary"
              />
              <Text
                size="sm_12"
                className="leading-[1.3] font-medium text-primary"
              >
                {t('common:actions.details')}
              </Text>
            </button>
          </div>

          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="hospital"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                {t('appointment:hospitalAndBranch')}
              </Text>
              <Text
                size="lg_16"
                className="leading-[1.2] font-semibold text-[#333333]"
              >
                {getLocalizedTextByLang(
                  branch?.nameVi ?? '',
                  branch?.nameKh ?? '',
                  branch?.nameEn ?? '',
                  i18n.language as AppLanguage,
                )}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-[16px]">
            <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
              <Text
                size="xs_10"
                className="font-bold leading-[15px] text-dust-red-4 uppercase"
              >
                {t('appointment:date')}
              </Text>
              <Text className="leading-normal font-medium text-[#333333]">
                {formatDate(
                  appointmentDate,
                  DATE_TIME_TYPE.MMM_DD_YYYY,
                  i18n.language,
                )}
              </Text>
            </div>
            <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
              <Text
                size="xs_10"
                className="font-bold leading-[15px] text-dust-red-4 uppercase"
              >
                {t('appointment:time')}
              </Text>
              <Text className="leading-normal font-medium text-[#333333]">
                {startTime} - {endTime}
              </Text>
            </div>
          </div>
        </div>

        {/* CR-01/CR-02: Add-on services + ô ghi chú (1 card, bám Figma) */}
        {hasAddons ? (
          <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
            <Text
              size="lg_16"
              className="leading-[1.2] font-semibold text-[#0F172A]"
            >
              {t('appointment:addonServices')}
            </Text>
            {addonServiceTypes?.map((service, index) => (
              <Fragment key={service.id}>
                <AddonReviewRow
                  service={service}
                  onDetailClick={() => {
                    setSelectedService(service)
                    setOpenDetailService(true)
                  }}
                  onEditRooms={() => setHotelEditTarget(service)}
                />
                {index < (addonServiceTypes?.length ?? 0) - 1 && (
                  <div className="h-[0.5px] bg-[#E6E6E6]" />
                )}
              </Fragment>
            ))}
            {renderNotes(true)}
          </div>
        ) : (
          <div className="flex flex-col gap-[12px] p-[20px] rounded-[16px] bg-white">
            {renderNotes(false)}
          </div>
        )}

        {first100Banner?.show_banner ? (
          <First100Banner
            title={first100Banner.title}
            description={first100Banner.description}
          />
        ) : null}

        {(consultationFee > 0 || feeInfo.serviceFee > 0) && (
          <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
            <Text
              size="lg_16"
              className="font-semibold leading-[1.2] text-[#0F172A]"
            >
              {t('appointment:paymentDetails')}
            </Text>
            {feeInfo.consultationFee > 0 && (
              <div className="flex items-center justify-between">
                <Text className="leading-normal text-muted-foreground">
                  {t('appointment:deposit')}
                </Text>
                <Text className="leading-normal font-medium text-[#333333]">
                  {formatPrice(consultationFee)}
                </Text>
              </div>
            )}
            {addonServiceTypes &&
              addonServiceTypes?.length > 0 &&
              addonServiceTypes.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <Text className="leading-normal text-muted-foreground">
                    {service.typeName}
                  </Text>
                  <Text className="leading-normal font-medium text-[#333333]">
                    {formatPrice(lineTotalOf(service))}
                  </Text>
                </div>
              ))}

            {/* CR-02: dòng giảm giá First100 (xanh, bám Figma) */}
            {feeInfo.discount > 0 && (
              <div className="flex items-center justify-between">
                <Text className="leading-normal font-medium text-[#16A34A]">
                  {t('appointment:discount')}
                </Text>
                <Text className="leading-normal font-medium text-[#237804]">
                  {`- ${formatPrice(feeInfo.discount)}`}
                </Text>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-[16px]">
              <Text
                size="lg_16"
                className="font-semibold leading-[1.2] text-[#333333]"
              >
                {t('appointment:totalAmount')}
              </Text>
              <Text
                size="xl_18"
                className="leading-normal font-semibold text-primary"
              >
                {formatPrice(feeInfo.totalAmount)}
              </Text>
            </div>
          </div>
        )}

        {feeInfo.totalAmount > 0 && (
          <div className="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white">
            <Text
              size="lg_16"
              className="font-semibold leading-[1.2] text-[#0F172A]"
            >
              {t('appointment:paymentMethodsHeading')}
            </Text>
            {paymentMethods.map((method) => (
              <PaymentMethodItem
                key={method.id}
                logo={method.logo}
                title={method.name}
                selected={paymentMethod?.id === method.id}
                onClick={() => setData({ paymentMethod: method })}
              />
            ))}
          </div>
        )}
      </div>
      <ModalDetailService
        serviceType={selectedService}
        open={openDetailService}
        onOpenChange={setOpenDetailService}
      />
      <AppointmentDetailSheet
        open={openAppointmentDetail}
        onOpenChange={setOpenAppointmentDetail}
      />
      <AddonHotelModal
        open={!!hotelEditTarget}
        onOpenChange={(o) => !o && setHotelEditTarget(undefined)}
        initialRooms={hotelEditTarget?.rooms}
        onConfirm={(rooms) => {
          if (hotelEditTarget && rooms?.length) {
            setAddonRooms(hotelEditTarget.id, rooms)
          }
        }}
      />
    </>
  )
}
