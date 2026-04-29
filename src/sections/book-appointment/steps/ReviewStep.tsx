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

const PICK_UP_SERVICE_ID = 1

const formatTimeInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  const hour = Math.min(Number(digits.slice(0, 2) || '0'), 23)
  const minuteRaw = digits.slice(2)

  if (minuteRaw.length === 1) {
    return `${hour.toString().padStart(2, '0')}:${minuteRaw}`
  }

  const minute = Math.min(Number(minuteRaw || '0'), 59)
  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`
}

const isValidPickupTime = (value?: string) => {
  if (!value) return false
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
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
  const [isPickupTimeTouched, setIsPickupTimeTouched] = useState(false)
  const pickupTimeError =
    isPickupTimeTouched && pickupTime && !isValidPickupTime(pickupTime)
      ? t('pickup.invalidTimeFormat', {
          defaultValue: 'Please enter a valid time in HH:mm format',
        })
      : undefined

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between gap-[16px]">
        <Text className="leading-normal">{service.typeName}</Text>
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
          <TextInputBase
            label={t('pickup.timeLabel')}
            placeholder={t('pickup.placeholderTime')}
            type="text"
            inputMode="numeric"
            pattern="[0-9:]*"
            maxLength={5}
            value={pickupTime}
            msgError={pickupTimeError}
            onBlur={() => setIsPickupTimeTouched(true)}
            onChange={(e) => {
              setIsPickupTimeTouched(true)
              setData({ pickupTime: formatTimeInput(e.target.value) })
            }}
          />
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
  const { i18n, t } = useTranslation(['book-appointment', 'appointment'])
  const [openDetailService, setOpenDetailService] = useState(false)
  const [selectedService, setSelectedService] = useState<
    ServiceType | undefined
  >(undefined)
  const {
    branch,
    specialty,
    doctor,
    hospital,
    packageData,
    patientProfile,
    appointmentDate,
    startTime,
    endTime,
    paymentMethod,
    bookingType,
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
      {
        id: 2,
        name: t('paymentMethodName.emoney'),
        logo: '/payment-method/e-money.png',
      },
      {
        id: 3,
        name: t('paymentMethodName.aba'),
        logo: '/payment-method/aba-bank.png',
      },
    ],
    [t],
  )

  return (
    <>
      <div className="flex flex-col gap-[16px] px-[16px]">
        {bookingType === 'HOSPITAL' && (
          <div className="flex items-center px-[30px] py-[16px] rounded-[48px] bg-[#ED26300D] border-2 border-[#ED263033]">
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text size="sm_12" color="secondary" className="leading-[1.3]">
                {t('appointment:reviewBadgeBookByHospital')}
              </Text>
              <Text className="leading-[1.2] font-semibold text-[#333333]">
                {hospital?.name}
              </Text>
            </div>
            <div
              className="
            w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2
         border-white/30 flex items-center justify-center"
            >
              <Icon
                name="hospital_solid"
                className="w-[10px] h-[10px] text-white"
              />
            </div>
          </div>
        )}

        {bookingType === 'DOCTOR' && (
          <>
            <div className="flex items-center px-[30px] py-[16px] rounded-[48px] bg-[#ED26300D] border-2 border-[#ED263033]">
              <div className="flex-1 flex flex-col gap-[6px]">
                <Text size="sm_12" color="secondary" className="leading-[1.3]">
                  {t('appointment:reviewBadgeBookByDoctor')}
                </Text>
                <Text className="leading-[1.2] font-semibold text-[#333333]">
                  {doctor?.name}
                </Text>
              </div>
              <div
                className="
            w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2
         border-white/30 flex items-center justify-center"
              >
                <Icon
                  name="user_doctor_solid"
                  className="w-[10px] h-[10px] text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white">
              <Text size="lg_16" className="leading-[1.2] font-semibold">
                {t('appointment:medicalProfessional')}
              </Text>
              <div className="flex items-start gap-[16px]">
                <Image
                  src={doctor?.avatarUrl ?? ''}
                  alt={doctor?.name}
                  className="w-[80px] h-[80px] rounded-full"
                />
                <div className="flex-1 flex flex-col gap-[10px]">
                  <Text className="leading-normal font-medium text-[#333333]">
                    {doctor?.name}
                  </Text>
                  <div
                    className={cn(
                      'grid gap-[8px] items-start',
                      doctor?.specialties?.length > 1
                        ? 'grid-cols-2'
                        : 'grid-cols-1',
                    )}
                  >
                    {doctor?.specialties &&
                      doctor?.specialties.length > 0 &&
                      doctor?.specialties.map((specialty, index) => (
                        <Text
                          key={`${doctor?.doctorId}-spec-h-${index}`}
                          size="sm_12"
                          className="flex items-center gap-[8px] font-normal text-muted-foreground leading-[1.3]"
                        >
                          <div className="size-[4px] rounded-full bg-muted-foreground" />
                          {specialty}
                        </Text>
                      ))}
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Icon
                      name="money"
                      className="w-[16px] h-[16px] text-primary"
                    />
                    <Text className="font-medium leading-normal text-[#333333]">
                      {t('appointment:consultationWithAmount', {
                        amount: formatPrice(doctor?.consultationFee ?? 0),
                      })}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {bookingType === 'PACKAGE' && (
          <>
            <div className="flex items-center px-[30px] py-[16px] rounded-[48px] bg-[#ED26300D] border-2 border-[#ED263033]">
              <div className="flex-1 flex flex-col gap-[6px]">
                <Text size="sm_12" color="secondary" className="leading-[1.3]">
                  {t('appointment:reviewBadgeBookByPackage')}
                </Text>
                <Text className="leading-[1.2] font-semibold text-[#333333]">
                  {getLocalizedTextByLang(
                    packageData?.name ?? '',
                    '',
                    '',
                    i18n.language as AppLanguage,
                  )}
                </Text>
              </div>
              <div
                className="
            w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2
         border-white/30 flex items-center justify-center"
              >
                <Icon
                  name="medical_web_service_solid"
                  className="w-[10px] h-[10px] text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white">
              <Text size="lg_16" className="leading-[1.2] font-semibold">
                {t('appointment:selectedPackageTitle')}
              </Text>
              <div className="flex items-center gap-[16px]">
                <Image
                  src={packageData?.imageUrl ?? ''}
                  alt={getLocalizedTextByLang(
                    packageData?.name ?? '',
                    '',
                    '',
                    i18n.language as AppLanguage,
                  )}
                  className="w-[57px] h-[57px] rounded-full"
                />
                <div className="flex flex-col gap-[10px]">
                  <Text className="leading-normal font-medium text-[#333333]">
                    {getLocalizedTextByLang(
                      packageData?.name ?? '',
                      '',
                      '',
                      i18n.language as AppLanguage,
                    )}
                  </Text>
                  <div className="flex items-center gap-[8px]">
                    <Icon
                      name="money"
                      className="w-[16px] h-[16px] text-primary"
                    />
                    {packageData?.promotionPrice != null &&
                    packageData?.price > packageData?.promotionPrice ? (
                      <div className="flex items-center gap-[8px]">
                        <Text
                          size="lg_16"
                          className="font-semibold leading-[1.2] text-primary"
                        >
                          {formatPrice(packageData?.promotionPrice)}
                        </Text>
                        <Text className="leading-normal text-muted-foreground line-through">
                          {formatPrice(packageData?.price)}
                        </Text>
                      </div>
                    ) : (
                      <Text className="font-medium leading-normal text-[#333333]">
                        {formatPrice(packageData?.price)}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col gap-[16px] p-[16px] rounded-[16px] bg-white">
          <Text size="lg_16" className="leading-[1.2] font-semibold">
            {t('appointment:appointmentInformation')}
          </Text>
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
              <Text className="leading-normal text-[#333333]">
                {getLocalizedTextByLang(
                  branch?.province?.nameVi ?? '',
                  null,
                  branch?.province?.nameEn ?? '',
                  i18n.language as AppLanguage,
                )}
              </Text>
            </div>
          </div>
          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="location_appointment"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                {t('appointment:address')}
              </Text>
              <Text
                size="base_14"
                className="leading-normal font-medium text-[#333333]"
              >
                {branch?.detailedAddress}
              </Text>
            </div>
          </div>
          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="user_outline"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                {t('appointment:patient')}
              </Text>
              <Text
                size="base_14"
                className="leading-normal font-medium text-[#333333]"
              >
                {patientProfile?.fullName}
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
                {formatDate(appointmentDate, DATE_TIME_TYPE.MMM_DD_YYYY)}
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

          {specialty && (
            <div className="flex items-center gap-[12px] bg-[#F8FAFC] p-[12px] rounded-[8px]">
              <Image
                src={specialty.iconUrl}
                alt={specialty.name}
                className="w-[20px] h-[20px]"
              />
              <Text className="flex-1 leading-normal font-medium">
                {t('appointment:specialtyWithName', {
                  name: specialty?.name ?? '',
                })}
              </Text>
            </div>
          )}
        </div>

        {addonServiceTypes && addonServiceTypes.length > 0 && (
          <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
            <Text size="lg_16" className="leading-[1.2] font-semibold">
              {t('appointment:addonServices')}
            </Text>
            <div className="flex items-center gap-[8px] px-[10px] py-[6px] rounded-[8px] bg-[#F0B13312]">
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
            </div>
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

        {consultationFee > 0 && (
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
                {formatPrice(consultationFee)}
              </Text>
            </div>
          </div>
        )}

        {consultationFee > 0 && (
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
    </>
  )
}
