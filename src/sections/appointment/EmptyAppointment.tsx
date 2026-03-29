import { useTranslation } from 'react-i18next'

import Image from '#/components/image'
import Text from '#/components/text'
import emptyAppointmentPng from '#/assets/images/appointment/empty-appointment.png'

export type EmptyAppointmentVariant = 'upcoming' | 'history'

export interface EmptyAppointmentProps {
  /**
   * `upcoming` — màn Appointments (cũ): một dòng `noAppointmentYet`.
   * `history` — màn History: hai dòng copy riêng lịch sử.
   */
  variant?: EmptyAppointmentVariant
}

export default function EmptyAppointment({
  variant = 'upcoming',
}: EmptyAppointmentProps) {
  const { t } = useTranslation(['appointment'])

  if (variant === 'history') {
    return (
      <div className="flex min-h-[calc(100vh-162px)] items-center justify-center px-4">
        <div className="flex max-w-sm flex-col items-center text-center">
          <Image
            src={emptyAppointmentPng}
            alt={t('appointment:emptyHistoryTitle')}
            className="h-[65px] w-[86px] object-contain"
          />
          <Text
            size="base_14"
            className="mt-[14px] font-medium leading-normal text-[#334155]"
          >
            {t('appointment:emptyHistoryTitle')}
          </Text>
          <Text
            size="base_14"
            className="mt-1 font-normal leading-normal text-[#64748B]"
          >
            {t('appointment:emptyHistoryDescription')}
          </Text>
        </div>
      </div>
    )
  }

  /* Appointments — layout cũ: một dòng */
  return (
    <div className="flex min-h-[calc(100vh-162px)] items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <Image
          src={emptyAppointmentPng}
          alt={t('appointment:noAppointmentYet')}
          className="h-[65px] w-[86px] object-contain"
        />
        <Text
          size="base_14"
          className="mt-[14px] font-normal leading-normal text-[#64748B]"
        >
          {t('appointment:noAppointmentYet')}
        </Text>
      </div>
    </div>
  )
}
