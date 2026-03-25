import { Icon } from '#/components/icon'
import LoadingBlocking from '#/components/LoadingBlocking'
import Text from '#/components/text'
import AppointmentInformation from '#/sections/appointment/AppointmentInformation'
import Header from '#/sections/appointment/Header'
import { useGetAppointmentDetailsQuery } from '#/services/query/appointment/apoiments-details'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/appointments/(detailLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/app/appointments/(detailLayout)/$id' })
  const { t } = useTranslation(['appointment'])
  const { data: appointmentData, isLoading } = useGetAppointmentDetailsQuery({
    params: { id: parseInt(id) },
  })

  return (
    <div className="p-4 pb-20">
      <Header appointment={appointmentData?.data} />
      <AppointmentInformation appointment={appointmentData?.data} />

      <div
        className="mt-4 flex flex-col gap-[12px]
      rounded-[12px] px-[16px] py-[20px] bg-[#F0B1330D] border-l-4 border-[#F0B133]
      "
      >
        <div className="flex items-center gap-[8px]">
          <Icon name="warning" className="w-[15px] h-[15px] text-[#F0B133]" />
          <Text className="font-semibold leading-[1.2] text-[#F0B133]">
            {t('importantReminders')}
          </Text>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F0B133]" />
            <Text size="sm_12" className="leading-[1.3] text-[#334155]">
              {t('reminderArriveEarly')}
            </Text>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F0B133]" />
            <Text size="sm_12" className="leading-[1.3] text-[#334155]">
              {t('reminderBringId')}
            </Text>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F0B133]" />
            <Text size="sm_12" className="leading-[1.3] text-[#334155]">
              {t('reminderBringMedicalRecords')}
            </Text>
          </div>
        </div>
      </div>
      {/* <AppointmentHospitalDetail /> */}
      <LoadingBlocking isLoading={isLoading} />
    </div>
  )
}
