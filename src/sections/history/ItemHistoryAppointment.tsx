import Image from '#/components/image'
import Text from '#/components/text'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import GetStatus from '../appointment/GetStatus'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

export interface ItemHistoryAppointmentProps {
  item: MyAppointmentItem
  className?: string
}

export default function ItemHistoryAppointment({
  item,
  className,
}: ItemHistoryAppointmentProps) {
  const { t, i18n } = useTranslation(['appointment'])

  const label = useMemo(() => {
    if (item.bookingType === 'HOSPITAL') {
      return getLocalizedTextByLang(
        item.hospital?.nameVi || '',
        item.hospital?.nameKh || '',
        item.hospital?.nameEn || '',
        i18n.language as AppLanguage,
      )
    }
    if (item.bookingType === 'PACKAGE') {
      return item.medicalPackage?.name
    }

    if (item.bookingType === 'DOCTOR') {
      return getLocalizedTextByLang(
        item.doctor?.nameVi || '',
        item.doctor?.nameKh || '',
        item.doctor?.nameEn || '',
        i18n.language as AppLanguage,
      )
    }

    return ''
  }, [item.bookingType, t])

  const avatarSrc = useMemo(() => {
    if (item.bookingType === 'DOCTOR') {
      return item?.doctor?.avatarUrl
    }
    if (item.bookingType === 'HOSPITAL') {
      return '1233'
    }
    if (item.bookingType === 'PACKAGE') {
      return '3123'
    }
    return ''
  }, [item.bookingType])

  const scheduleLabel = useMemo(() => {
    const locale = (i18n.language ?? '').startsWith('vi')
      ? 'vi-VN'
      : (i18n.language ?? '').startsWith('km')
        ? 'km-KH'
        : 'en-US'

    const dateLabel = dayjs(item.appointmentDate).isValid()
      ? (() => {
          const date = dayjs(item.appointmentDate).toDate()
          const weekday = new Intl.DateTimeFormat(locale, {
            weekday: 'short',
          }).format(date)
          const day = dayjs(item.appointmentDate).format('DD')
          const month = new Intl.DateTimeFormat(locale, {
            month: 'short',
          }).format(date)

          return `${weekday}, ${day} ${month}`
        })()
      : item.appointmentDate

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

    return `${dateLabel} • ${formatTime(item.startTime)} - ${formatTime(item.endTime)}`
  }, [i18n.language, item.appointmentDate, item.endTime, item.startTime])

  const router = useRouter()

  return (
    <div
      className={`w-full rounded-[12px] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${className ?? ''}`}
      onClick={() =>
        router.navigate({
          to: '/app/appointments/$id',
          params: { id: item.id.toString() },
        })
      }
    >
      <div className="flex gap-4">
        <Image
          src={avatarSrc}
          alt={label}
          className="size-[72px] rounded-full"
        />
        <div className="flex flex-col justify-between flex-1 gap-1">
          <Text size="base_14" className="font-semibold text-text-primary">
            {label}
          </Text>

          {item.bookingType !== 'HOSPITAL' && (
            <Text size="sm_12" className="text-[#A8071A] font-medium">
              {getLocalizedTextByLang(
                item?.hospital?.nameVi || '',
                item?.hospital?.nameKh || '',
                item?.hospital?.nameEn || '',
                i18n.language as AppLanguage,
              )}
            </Text>
          )}

          <Text
            size="sm_12"
            className="font-normal leading-[130%] text-[#64748B]"
          >
            {scheduleLabel}
          </Text>

          <div>
            <GetStatus status={item.status} />
          </div>
        </div>
      </div>
    </div>
  )
}
