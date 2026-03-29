import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import GetStatus from '#/sections/appointment/GetStatus'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { formatPrice } from '#/utils/price.util'
import { useTranslation } from 'react-i18next'

interface AppointmentHeaderProps {
  appointment?: MyAppointmentItem
}

export default function Header({ appointment }: AppointmentHeaderProps) {
  const { t, i18n } = useTranslation(['appointment'])
  const bookingType = appointment?.bookingType

  if (bookingType === 'HOSPITAL') return null

  if (bookingType === 'DOCTOR') {
    return (
      <div className="rounded-[12px] bg-white p-4">
        <div className="flex items-start justify-between">
          <Text
            size="lg_16"
            className="font-semibold leading-[24px] text-text-primary"
          >
            {t('medicalProfessional')}
          </Text>
          <GetStatus status={appointment?.status ?? ''} />
        </div>

        <div className="mt-4 flex items-stretch gap-6">
          <Image
            src={appointment?.doctor?.avatarUrl ?? ''}
            alt={appointment?.doctor?.nameEn ?? ''}
            className="size-[70px] rounded-full"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <Text
              size="base_14"
              className="font-semibold leading-[17px] text-[#0F172A]"
            >
              {i18n.language === 'vi'
                ? (appointment?.doctor?.nameVi ?? '')
                : (appointment?.doctor?.nameEn ?? '')}
            </Text>
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-secondary"
            >
              {appointment?.specialty?.name ?? ''}
            </Text>
            <div className="flex items-center gap-2">
              <Icon name="money_appointment" className="size-4" />
              <Text
                size="base_14"
                className="font-medium leading-[20px] text-text-primary"
              >
                {t('consultation')}:{' '}
                {formatPrice(appointment?.consultationFee ?? 0)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (bookingType === 'PACKAGE') {
    return (
      <div className="rounded-[12px] bg-white p-4">
        <div className="flex items-start justify-between">
          <Text
            size="lg_16"
            className="font-semibold leading-[24px] text-text-primary"
          >
            {t('servicePackage')}
          </Text>
          <GetStatus status={appointment?.status ?? ''} />
        </div>

        <div className="mt-4 flex items-stretch gap-6">
          <Image
            src="/logo.svg"
            alt={t('servicePackage')}
            className="size-[57px] rounded-full"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
            <Text
              size="base_14"
              className="font-semibold leading-[17px] text-[#0F172A]"
            >
              {appointment?.medicalPackage?.name ?? t('generalCheckup')}
            </Text>

            <div className="flex items-center gap-2">
              <Icon name="money_appointment" className="size-4" />
              <Text
                size="base_14"
                className="font-medium leading-[20px] text-text-primary"
              >
                ${appointment?.medicalPackage?.price ?? 0}
              </Text>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
