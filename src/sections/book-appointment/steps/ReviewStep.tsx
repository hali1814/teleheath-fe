import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import { useBookingStore } from '#/stores/booking-store'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatPrice } from '#/utils/price.util'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalDetailService } from '../ModalDetailService'
import type { ServiceType } from '#/types/service'
import TextInputBase from '#/components/input/TextInputBase'
import InputSelect from '#/components/input/InputSelect'
import { AppointmentDetailSheet } from '../AppointmentDetailSheet'

const PICK_UP_SERVICE_ID = 1

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const v = i.toString().padStart(2, '0')
  return { label: v, value: v }
})

const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => {
  const v = i.toString().padStart(2, '0')
  return { label: v, value: v }
})

const splitPickupTime = (value?: string): [string, string] => {
  if (!value) return ['', '']
  const [h = '', m = ''] = value.split(':')
  return [h, m]
}

const ServiceItem = ({
  service,
  onDetailClick,
}: {
  service: ServiceType
  onDetailClick: () => void
}) => {
  const { t } = useTranslation(['book-appointment', 'common'])
  const { pickupTime, pickupAddress, pickupNote, setData } = useBookingStore()
  const [pickupHour, pickupMinute] = splitPickupTime(pickupTime)

  const handlePickupHourChange = (value: string) => {
    const minute = pickupMinute || '00'
    setData({ pickupTime: `${value}:${minute}` })
  }

  const handlePickupMinuteChange = (value: string) => {
    const hour = pickupHour || '00'
    setData({ pickupTime: `${hour}:${value}` })
  }

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between gap-[16px]">
        <Text className="leading-normal">{service.addonServiceName}</Text>
        <button
          className="flex items-center gap-[4px] px-[8px] py-[6px] rounded-[6px] bg-dust-red-1"
          onClick={onDetailClick}
        >
          <Icon name="eye_outline" className="w-[16px] h-[16px] text-primary" />
          <Text size="sm_12" className="leading-[1.3] font-medium text-primary">
            {t('common:actions.details')}
          </Text>
        </button>
      </div>
      {service.id === PICK_UP_SERVICE_ID && (
        <>
          <div className="flex flex-col gap-1">
            <Text size="base_14" className="text-text-secondary font-normal">
              {t('pickup.timeLabel')}
            </Text>
            <div className="flex items-start gap-[8px]">
              <div className="flex-1 min-w-0">
                <InputSelect
                  placeholder={t('pickup.placeholderHour')}
                  options={HOUR_OPTIONS}
                  value={pickupHour || undefined}
                  onValueChange={handlePickupHourChange}
                />
              </div>
              <div className="flex-1 min-w-0">
                <InputSelect
                  placeholder={t('pickup.placeholderMinute')}
                  options={MINUTE_OPTIONS}
                  value={pickupMinute || undefined}
                  onValueChange={handlePickupMinuteChange}
                />
              </div>
            </div>
          </div>
          <TextInputBase
            label={t('pickup.addressLabel')}
            placeholder={t('pickup.placeholderAddress')}
            value={pickupAddress}
            onChange={(e) => setData({ pickupAddress: e.target.value })}
          />
          <TextInputBase
            label={t('pickup.noteLabel')}
            placeholder={t('pickup.placeholderNote')}
            value={pickupNote}
            onChange={(e) => setData({ pickupNote: e.target.value })}
          />
        </>
      )}
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
  const {
    branch,
    appointmentDate,
    startTime,
    endTime,
    paymentMethod,
    feeInfo,
    addonServiceTypes,
    calcFeeInfo,
    setData,
  } = useBookingStore()

  const consultationFee = branch?.depositFee ?? 0

  useEffect(() => {
    calcFeeInfo(consultationFee)
  }, [addonServiceTypes, calcFeeInfo, consultationFee])

  const paymentMethods = useMemo(
    () => [
      {
        id: 1,
        name: t('paymentMethodName.khqr'),
        logo: '/payment-method/khqr.png',
      },
      //   {
      //     id: 2,
      //     name: t('paymentMethodName.emoney'),
      //     logo: '/payment-method/e-money.png',
      //   },
      //   {
      //     id: 3,
      //     name: t('paymentMethodName.aba'),
      //     logo: '/payment-method/aba-bank.png',
      //   },
    ],
    [t],
  )

  return (
    <>
      <div className="flex flex-col gap-[16px] px-[16px]">
        <div className="flex flex-col gap-[16px] p-[16px] rounded-[16px] bg-white">
          <div className="flex items-center justify-between gap-[12px]">
            <Text size="lg_16" className="leading-[1.2] font-semibold">
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


        {addonServiceTypes && addonServiceTypes.length > 0 && (
          <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
            <Text size="lg_16" className="leading-[1.2] font-semibold">
              {t('appointment:addonServices')}
            </Text>
            {/* <div className="flex items-center gap-[8px] px-[10px] py-[6px] rounded-[8px] bg-[#F0B13312]">
              <Icon
                name="warning"
                className="w-[16px] h-[16px] text-[#F0B133]"
              />
              <Text
                size="sm_12"
                className="flex-1 leading-[1.3] text-[#FB9324]"
              >
                {t('appointment:addonPriceDisclaimer')}
              </Text>
            </div> */}
            {addonServiceTypes?.map((service, index) => (
              <>
                <ServiceItem
                  key={service.id}
                  service={service}
                  onDetailClick={() => {
                    setSelectedService(service)
                    setOpenDetailService(true)
                  }}
                />
                {index < addonServiceTypes.length - 1 && (
                  <div className="h-[0.5px] bg-[#E6E6E6]" />
                )}
              </>
            ))}
          </div>
        )}

        {(consultationFee > 0 || feeInfo.serviceFee > 0) && (
          <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
            <Text size="lg_16" className="font-semibold leading-[1.2]">
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
                <div className="flex items-center justify-between">
                  <Text className="leading-normal text-muted-foreground">
                    {service.addonServiceName}
                  </Text>
                  <Text className="leading-normal font-medium text-[#333333]">
                    {formatPrice(service.promotionPrice ?? service.price)}
                  </Text>
                </div>
              ))}

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
            <Text size="lg_16" className="font-semibold leading-[1.2]">
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
    </>
  )
}
