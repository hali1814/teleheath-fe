import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import GetStatus from './GetStatus'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import Image from '#/components/image'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

interface AppointmentInformationProps {
  appointment?: MyAppointmentItem
}

export default function AppointmentInformation({
  appointment,
}: AppointmentInformationProps) {
  const { t, i18n } = useTranslation(['appointment'])
  const bookingType = appointment?.bookingType
  const isHospital = bookingType === 'HOSPITAL'
  const formatTimeWithMeridiem = (value?: string) => {
    if (!value) return ''

    const parsed = dayjs(value, ['HH:mm:ss', 'HH:mm', 'hh:mm A'], true)
    if (!parsed.isValid()) return value

    return parsed.format('hh:mm A')
  }

  const formatTimeWithoutMeridiem = (value?: string) => {
    if (!value) return ''

    const parsed = dayjs(value, ['HH:mm:ss', 'HH:mm', 'hh:mm A'], true)
    if (!parsed.isValid()) return value

    return parsed.format('hh:mm')
  }

  return (
    <div className="rounded-[12px] bg-white p-4">
      <div className="flex items-start justify-between">
        <Text
          size="lg_16"
          className="font-semibold leading-[19px] text-text-primary"
        >
          {t('appointmentInformation')}
        </Text>
        {isHospital && <GetStatus status={appointment?.status ?? ''} />}
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[32px] bg-[#ED26301A]">
          <Icon
            name="hospital_appointment"
            color="#E22A36"
            className="size-5 text-primary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Text
            size="base_14"
            className="font-normal leading-[21px] text-text-secondary"
          >
            {t('hospitalAndBranch')}
          </Text>
          <Text
            size="lg_16"
            className="font-semibold leading-[24px] text-text-primary"
          >
            {i18n.language === 'vi'
              ? (appointment?.hospital?.nameVi ?? '')
              : (appointment?.hospital?.nameEn ?? '')}
          </Text>
          <Text
            size="base_14"
            className="font-normal leading-[21px] text-text-primary"
          >
            {appointment?.branch?.province}
          </Text>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[32px] bg-[#ED26301A]">
          <Icon name="location_appointment" className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <Text
            size="base_14"
            className="font-normal leading-[21px] text-text-secondary"
          >
            {t('address')}
          </Text>
          <Text
            size="base_14"
            className="font-normal leading-[150%] text-text-primary"
          >
            {appointment?.branch?.address}
          </Text>
          <div className="mt-[2px] flex items-center gap-1">
            <Icon
              name="map_outline"
              color="#A8071A"
              className="size-4 shrink-0"
            />
            <Text
              size="base_14"
              className="font-medium leading-[21px] text-[#A8071A]"
            >
              {t('map')}
            </Text>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[32px] bg-[#ED26301A]">
          <Icon name="user_appointment" className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <Text
            size="base_14"
            className="font-normal leading-[21px] text-text-secondary"
          >
            {t('patient')}
          </Text>
          <Text
            size="base_14"
            className="font-medium leading-[21px] text-text-primary"
          >
            {appointment?.patientName}
          </Text>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-[8px] border border-[#FFCCC7] bg-[#FFF1F0] p-3">
          <Text
            size="xs_10"
            className="font-bold uppercase leading-[15px] text-[#FF7875]"
          >
            {t('date')}
          </Text>
          <Text
            size="base_14"
            className="mt-2 font-medium leading-[21px] text-text-primary"
          >
            {formatDate(
              appointment?.appointmentDate,
              DATE_TIME_TYPE.MMM_DD_YYYY,
            )}
          </Text>
        </div>
        <div className="rounded-[8px] border border-[#FFCCC7] bg-[#FFF1F0] p-3">
          <Text
            size="xs_10"
            className="font-bold uppercase leading-[15px] text-[#FF7875]"
          >
            {t('time')}
          </Text>
          <Text
            size="base_14"
            className="mt-2 font-medium leading-[21px] text-text-primary"
          >
            {`${formatTimeWithoutMeridiem(appointment?.startTime)} - ${formatTimeWithMeridiem(appointment?.endTime)}`}
          </Text>
        </div>
      </div>

      {isHospital && (
        <div className="flex items-center gap-2 mt-4 bg-[#F8FAFC] p-3 rounded-[8px]">
          {appointment?.specialty?.iconUrl ? (
            <Image
              src={appointment?.specialty?.iconUrl ?? ''}
              alt="specialty"
              className="size-4"
            />
          ) : (
            <Icon name="medical_appointment" className="size-4" />
          )}
          <Text
            size="base_14"
            className="font-medium leading-[21px] text-text-primary"
          >
            {t('specialty')}: {appointment?.specialty?.name}
          </Text>
        </div>
      )}
    </div>
  )
}
