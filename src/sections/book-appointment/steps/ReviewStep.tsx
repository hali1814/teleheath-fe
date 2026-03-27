import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Checkbox } from '#/components/ui/checkbox'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import { useGetListServiceQuery } from '#/services/query/services/list-service'
import { useBookingStore } from '#/stores/booking-store'
import type { Service } from '#/types/hospital'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatPrice } from '#/utils/price.util'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalDetailService } from '../ModalDetailService'

const EMPTY_SERVICES: Service[] = []

const ServiceItem = ({
  service,
  selected,
  onClick,
  onDetailClick,
}: {
  service: Service
  selected: boolean
  onClick: () => void
  onDetailClick: () => void
}) => {
  return (
    <div className="flex items-center gap-[16px]">
      <Checkbox
        className="w-[20px] h-[20px] text-white border-secondary/20"
        checked={selected}
        onClick={onClick}
      />
      <div className="flex-1 flex-col gap-[6px]">
        <Text className="leading-normal text-muted-foreground">
          {service.name}
        </Text>
        <Text
          size="sm_12"
          className="leading-[1.2] font-semibold text-[#333333]"
        >
          {formatPrice(service.price)}
        </Text>
      </div>
      <button
        className="flex items-center gap-[4px] px-[8px] py-[6px] rounded-[6px] bg-dust-red-1"
        onClick={onDetailClick}
      >
        <Icon name="eye_outline" className="w-[16px] h-[16px] text-primary" />
        <Text size="sm_12" className="leading-[1.3] font-medium text-primary">
          Details
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
        <div className="w-[20px] h-[20px] rounded-full border border-[#D3313133]" />
      )}
    </div>
  )
}

const paymentMethods = [
  {
    id: 1,
    name: 'KHQR',
    logo: '/payment-method/khqr.png',
  },
  {
    id: 2,
    name: 'EMoney',
    logo: '/payment-method/e-money.png',
  },
  {
    id: 3,
    name: 'ABA Bank',
    logo: '/payment-method/aba-bank.png',
  },
]

export function ReviewStep() {
  const { i18n } = useTranslation()
  const [openDetailService, setOpenDetailService] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined,
  )
  const {
    branch,
    specialty,
    doctor,
    hospital,
    // package,
    patientProfile,
    appointmentDate,
    startTime,
    endTime,
    serviceIds,
    paymentMethod,
    bookingType,
    feeInfo,
    setData,
    calcFeeInfo,
  } = useBookingStore()

  const { data } = useGetListServiceQuery({
    params: {
      page: 1,
      size: 0,
    },
  })

  const services = data?.data ?? EMPTY_SERVICES

  const consultationFee =
    bookingType === 'DOCTOR'
      ? (doctor?.consultationFee ?? 0)
      : (hospital?.consultationFee ?? 0)

  useEffect(() => {
    const list = data?.data ?? EMPTY_SERVICES
    calcFeeInfo(list, consultationFee)
  }, [calcFeeInfo, consultationFee, data, serviceIds.join(',')])

  return (
    <>
      <div className="flex flex-col gap-[16px] px-[16px]">
        {bookingType === 'HOSPITAL' && (
          <div className="flex items-center px-[30px] py-[16px] rounded-[48px] bg-[#ED26300D] border-2 border-[#ED263033]">
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text size="sm_12" color="secondary" className="leading-[1.3]">
                BOOK BY HOSPITAL
              </Text>
              <Text className="leading-[1.2] font-semibold text-[#333333]">
                {getLocalizedTextByLang(
                  hospital?.nameVi ?? '',
                  hospital?.nameKh ?? '',
                  hospital?.nameEn ?? '',
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
                  BOOK BY DOCTOR
                </Text>
                <Text className="leading-[1.2] font-semibold text-[#333333]">
                  {getLocalizedTextByLang(
                    doctor?.nameVi ?? '',
                    doctor?.nameKh ?? '',
                    doctor?.nameEn ?? '',
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
                  name="user_doctor_solid"
                  className="w-[10px] h-[10px] text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white">
              <Text size="lg_16" className="leading-[1.2] font-semibold">
                Medical Professional
              </Text>
              <div className="flex items-center gap-[16px]">
                <Image
                  src={doctor?.avatarUrl ?? ''}
                  alt={getLocalizedTextByLang(
                    doctor?.nameVi ?? '',
                    doctor?.nameKh ?? '',
                    doctor?.nameEn ?? '',
                    i18n.language as AppLanguage,
                  )}
                  className="w-[80px] h-[80px] rounded-full"
                />
                <div className="flex flex-col gap-[10px]">
                  <Text className="leading-normal font-medium text-[#333333]">
                    {getLocalizedTextByLang(
                      doctor?.nameVi ?? '',
                      doctor?.nameKh ?? '',
                      doctor?.nameEn ?? '',
                      i18n.language as AppLanguage,
                    )}
                  </Text>
                  <Text
                    size="sm_12"
                    className="leading-[1.3] text-muted-foreground"
                  >
                    {doctor?.specialties?.[0]?.name}
                  </Text>
                  <div className="flex items-center gap-[8px]">
                    <Icon
                      name="money"
                      className="w-[16px] h-[16px] text-primary"
                    />
                    <Text className="font-medium leading-normal text-[#333333]">
                      Consultation: {formatPrice(doctor?.consultationFee ?? 0)}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col gap-[16px] p-[16px] rounded-[16px] bg-white">
          <Text size="lg_16" className="leading-[1.2] font-semibold">
            Appointment Information
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
                Hospital & Branch
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
              {/* <Text className="leading-normal text-[#333333]">
              {branch?.address}
            </Text> */}
            </div>
          </div>
          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="map_marker_outline"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                Address
              </Text>
              <Text
                size="base_14"
                className="leading-normal font-medium text-[#333333]"
              >
                {branch?.address}
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
                Patient
              </Text>
              <Text
                size="base_14"
                className="leading-normal font-medium text-[#333333]"
              >
                {patientProfile?.name}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-[16px]">
            <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
              <Text
                size="xs_10"
                className="font-bold leading-[15px] text-dust-red-4 uppercase"
              >
                Date
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
                Time
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
                Specialty: {specialty?.name}
              </Text>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
          <div className="flex-col gap-[4px]">
            <Text size="lg_16" className="leading-[1.2] font-semibold">
              Services
            </Text>
            <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
              Choose the additional service you want to purchase.
            </Text>
          </div>
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              selected={serviceIds.includes(service.id)}
              onClick={() => {
                if (serviceIds.includes(service.id)) {
                  setData({
                    serviceIds: serviceIds.filter((s) => s !== service.id),
                  })
                } else {
                  setData({ serviceIds: [...serviceIds, service.id] })
                }
              }}
              onDetailClick={() => {
                setSelectedService(service)
                setOpenDetailService(true)
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
          <Text size="lg_16" className="font-semibold leading-[1.2]">
            Payment Details
          </Text>
          <div className="flex items-center justify-between">
            <Text className="leading-normal text-muted-foreground">
              Consultation Fee
            </Text>
            <Text className="leading-normal font-medium text-[#333333]">
              {formatPrice(feeInfo.consultationFee)}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="leading-normal text-muted-foreground">
              Service Fee
            </Text>
            <Text className="leading-normal font-medium text-[#333333]">
              {formatPrice(feeInfo.serviceFee)}
            </Text>
          </div>
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-[16px]">
            <Text
              size="lg_16"
              className="font-semibold leading-[1.2] text-[#333333]"
            >
              Total Amount
            </Text>
            <Text
              size="xl_18"
              className="leading-normal font-semibold text-primary"
            >
              {formatPrice(feeInfo.totalAmount)}
            </Text>
          </div>
        </div>

        {feeInfo.totalAmount > 0 && (
          <div className="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white">
            <Text size="lg_16" className="font-semibold leading-[1.2]">
              Payment Methods
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
        service={selectedService}
        open={openDetailService}
        onOpenChange={setOpenDetailService}
        onSelectService={() => {
          setData({
            serviceIds: selectedService
              ? [...serviceIds, selectedService.id]
              : serviceIds,
          })
          setSelectedService(undefined)
          setOpenDetailService(false)
        }}
      />
    </>
  )
}
