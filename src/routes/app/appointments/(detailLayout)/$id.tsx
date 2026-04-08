import { Icon } from '#/components/icon'
import LoadingBlocking from '#/components/LoadingBlocking'
import LoadingState from '#/components/LoadingState'
import Text from '#/components/text'
import AppointmentInformation from '#/sections/appointment/AppointmentInformation'
import Header from '#/sections/appointment/Header'
import MedicalRecords from '#/sections/appointment/MedicalRecords'
import PaymentSection from '#/sections/appointment/PaymentSection'
import SelectedServices from '#/sections/appointment/SelectedServices'
import { useGetAppointmentDetailsQuery } from '#/services/query/appointment/apoiments-details'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

/** Query: `?type=appointment` | `?type=history` (mặc định `appointment`) */
const appointmentDetailSearchSchema = z.object({
  type: z.enum(['appointment', 'history']).optional().default('appointment'),
})

export type AppointmentDetailSearch = z.infer<
  typeof appointmentDetailSearchSchema
>

export const Route = createFileRoute('/app/appointments/(detailLayout)/$id')({
  validateSearch: (search): AppointmentDetailSearch =>
    appointmentDetailSearchSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/app/appointments/(detailLayout)/$id' })
  const { type } = Route.useSearch()
  const { t } = useTranslation(['appointment'])
  const { data: appointmentData, isLoading } = useGetAppointmentDetailsQuery({
    params: { id: parseInt(id) },
    staleTime: 0,
    gcTime: 0,
  })

  const status = appointmentData?.data?.status
  const showCancelledBanner = status === 'CANCELLED'
  const showCompletedBanner = status === 'COMPLETED'

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="p-4 pb-20" data-entry-source={type}>
      {(showCancelledBanner || showCompletedBanner) && (
        <div className="mb-4 flex items-start gap-3 rounded-[12px] bg-[#FFF1F0] px-4 py-3">
          <Icon
            name={
              showCancelledBanner
                ? 'appointment_cancel'
                : 'appointment_clock_detail'
            }
            className="mt-0.5 size-[17px] shrink-0"
            aria-hidden
          />
          <Text
            size="base_14"
            className="font-medium leading-normal text-[#E22A36]"
          >
            {showCancelledBanner
              ? t('detailBannerCancelled')
              : t('detailBannerCompleted')}
          </Text>
        </div>
      )}
      <Header appointment={appointmentData?.data} />
      <AppointmentInformation appointment={appointmentData?.data} />
      <SelectedServices services={appointmentData?.data?.services} />
      <MedicalRecords
        medicalFiles={appointmentData?.data?.medicalFiles}
        notes={appointmentData?.data?.notes}
      />
      {type === 'history' && (
        <PaymentSection appointment={appointmentData?.data} />
      )}
      {appointmentData?.data?.status === 'CONFIRMED' && (
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
      )}
      {/* <AppointmentHospitalDetail /> */}
    </div>
  )
}
