import { useTranslation } from 'react-i18next'

import Image from '#/components/image'
import Text from '#/components/text'
import emptyAppointmentPng from '#/assets/images/appointment/empty-appointment.png'

export default function EmptyAppointment() {
  const { t } = useTranslation(['appointment'])

  return (
    <div className="flex min-h-[calc(100vh-162px)] items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <Image
          src={emptyAppointmentPng}
          alt="Empty appointment"
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
