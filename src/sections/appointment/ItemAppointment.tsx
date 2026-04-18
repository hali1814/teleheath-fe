import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useRouter } from '@tanstack/react-router'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import Image from '#/components/image'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'
import { getGoogleMapsHref } from '#/utils/google-maps.util'
import { webIntent } from '#/utils/auth'
import { toast } from 'sonner'

export interface ItemAppointmentProps {
  appointment: MyAppointmentItem
}

export default function ItemAppointment({ appointment }: ItemAppointmentProps) {
  const { t, i18n } = useTranslation(['appointment'])
  const router = useRouter()
  const mapsHref = useMemo(() => {
    return getGoogleMapsHref(
      appointment.branch?.googleMapsEmbed,
      appointment.branch?.address,
    )
  }, [appointment.branch?.googleMapsEmbed, appointment.branch?.address])

  const label = useMemo(() => {
    if (appointment.bookingType === 'HOSPITAL') {
      return getLocalizedTextByLang(
        appointment.hospital?.nameVi || '',
        appointment.hospital?.nameKh || '',
        appointment.hospital?.nameEn || '',
        i18n.language as AppLanguage,
      )
    }
    if (appointment.bookingType === 'PACKAGE') {
      return appointment.medicalPackage?.name
    }

    if (appointment.bookingType === 'DOCTOR') {
      return getLocalizedTextByLang(
        appointment.doctor?.nameVi || '',
        appointment.doctor?.nameKh || '',
        appointment.doctor?.nameEn || '',
        i18n.language as AppLanguage,
      )
    }

    return ''
  }, [appointment.bookingType, t])

  const avatarSrc = useMemo(() => {
    return appointment?.thumbnailUrl
  }, [appointment?.thumbnailUrl])

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
          search: { type: 'appointment' },
        })
      }
    >
      <div className="flex gap-3 bg">
        <Image
          src={avatarSrc}
          alt={label}
          className="size-[72px] rounded-full "
        />

        <div className="gap-3 flex flex-col flex-1">
          <div className="min-w-0 flex-1  flex flex-col gap-2">
            <Text
              size="base_14"
              className="mt-1 font-semibold text-text-primary"
            >
              {label}
            </Text>
            {appointment.bookingType !== 'HOSPITAL' && (
              <Text size="sm_12" className="text-[#A8071A] font-medium">
                {getLocalizedTextByLang(
                  appointment?.hospital?.nameVi || '',
                  appointment?.hospital?.nameKh || '',
                  appointment?.hospital?.nameEn || '',
                  i18n.language as AppLanguage,
                )}
              </Text>
            )}

            <Text size="sm_12" className="font-normal text-[#64748B]">
              {scheduleLabel}
            </Text>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              if (!mapsHref) {
                toast.error(t('getDirectionsDescription'))
                return
              }
              webIntent(mapsHref ?? '')
            }}
            className={`h-[36px] gap-2 bg-[#FFF1F0]`}
          >
            <Icon name="map_blue" className="size-4" />
            <Text size="base_14" className="font-medium text-primary">
              {t('getDirections')}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  )
}
