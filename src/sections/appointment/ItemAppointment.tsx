import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useRouter } from '@tanstack/react-router'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import Image from '#/components/image'

export interface ItemAppointmentProps {
  appointment: MyAppointmentItem
}

export function ActionButton({
  text,
  iconName,
  disabled = false,
  variant = 'primary',
  onClick,
}: {
  text: string
  iconName?: IconName
  disabled?: boolean
  variant?: 'primary' | 'light' | 'danger-outline'
  onClick?: () => void
}) {
  const baseClass =
    'h-[36px] flex-1 rounded-[8px] px-3 py-2 text-base font-medium leading-[20px]'

  if (variant === 'danger-outline') {
    return (
      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        onClick={onClick}
        className={`${baseClass} border border-[#FFCCC7] bg-white text-primary hover:bg-[#FFF7F6]`}
      >
        {text}
      </Button>
    )
  }

  if (variant === 'light') {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={onClick}
        className={`${baseClass} gap-2 bg-[#E6F0FF] text-[#1D5EF2] hover:bg-[#DDE9FF] disabled:bg-[#E6EEF9] disabled:text-[#1D5EF2]`}
      >
        {iconName ? <Icon name={iconName} className="size-4" /> : null}
        {text}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="secondary"
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} gap-2 ${disabled ? 'bg-[#D9D9D9] text-white' : 'bg-primary text-white '}`}
    >
      {iconName ? <Icon name={iconName} className="size-4" /> : null}
      {text}
    </Button>
  )
}

export default function ItemAppointment({ appointment }: ItemAppointmentProps) {
  const { t, i18n } = useTranslation(['appointment'])
  const router = useRouter()

  const label = useMemo(() => {
    if (appointment.bookingType === 'HOSPITAL') {
      return i18n.language === 'vi'
        ? appointment.hospital?.nameVi
        : appointment.hospital?.nameEn
    }
    if (appointment.bookingType === 'PACKAGE') {
      return appointment.medicalPackage?.name
    }

    if (appointment.bookingType === 'DOCTOR') {
      return i18n.language === 'vi'
        ? appointment.doctor?.nameVi
        : appointment.doctor?.nameEn
    }

    return ''
  }, [appointment.bookingType, t])

  const avatarSrc = useMemo(() => {
    if (appointment.bookingType === 'DOCTOR') {
      return appointment?.doctor?.avatarUrl
    }
    if (appointment.bookingType === 'HOSPITAL') {
      return '1233'
    }
    if (appointment.bookingType === 'PACKAGE') {
      return '3123'
    }
    return ''
  }, [appointment.bookingType])

  const scheduleLabel = useMemo(() => {
    const locale = (i18n.language ?? '').startsWith('vi')
      ? 'vi-VN'
      : (i18n.language ?? '').startsWith('km')
        ? 'km-KH'
        : 'en-US'

    const dateLabel = dayjs(appointment.appointmentDate).isValid()
      ? (() => {
          const date = dayjs(appointment.appointmentDate).toDate()
          const weekday = new Intl.DateTimeFormat(locale, {
            weekday: 'short',
          }).format(date)
          const day = dayjs(appointment.appointmentDate).format('DD')
          const month = new Intl.DateTimeFormat(locale, {
            month: 'short',
          }).format(date)

          return `${weekday}, ${day} ${month}`
        })()
      : appointment.appointmentDate

    const formatTime = (value: string) => {
      const parsed = dayjs(value, ['HH:mm:ss', 'HH:mm', 'hh:mm A'], true)
      if (parsed.isValid()) {
        return new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(parsed.toDate())
      }
      return value
    }

    return `${dateLabel} • ${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}`
  }, [
    i18n.language,
    appointment.appointmentDate,
    appointment.endTime,
    appointment.startTime,
  ])

  return (
    <div
      className={`w-full rounded-[12px] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]`}
      onClick={() =>
        router.navigate({
          to: '/app/appointments/$id',
          params: { id: appointment.id.toString() },
        })
      }
    >
      <div className="flex items-center gap-3">
        <Image
          src={avatarSrc}
          alt={label}
          className="size-[65px] rounded-full"
        />
        <div className="min-w-0 flex-1 gap-1 flex flex-col">
          <Text
            size="sm_12"
            className={`font-medium uppercase tracking-[0.03em] text-[#1D5EF2]`}
          >
            {t('inPersonVisit')}
          </Text>
          <Text size="base_14" className="mt-1 font-semibold text-text-primary">
            {label}
          </Text>
          <Text size="sm_12" className="mt-1 font-normal text-[#64748B]">
            {scheduleLabel}
          </Text>
        </div>

        <div
          className={`flex absolute right-4 top-4 size-8 items-center justify-center rounded-[8px] p-2 bg-[#E6F0FF]`}
        >
          <Icon name={'location_blue'} className="size-4" color={'#1D5EF2'} />
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <ActionButton
          text={t('getDirections')}
          iconName="map_blue"
          variant="light"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
