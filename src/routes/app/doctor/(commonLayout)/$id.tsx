import {
  DoctorInfoHeader,
  DoctorConsultationFee,
  AboutDoctor,
  DoctorCurrentLocation,
  DoctorEducationCertifications,
  DoctorActions,
} from '#/sections/doctor'
import { Header } from '#/sections/home'
import { useGetDoctorDetailQuery } from '#/services/query/doctor/doctor-detail'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/doctor/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['doctor'])
  const { id } = useParams({ from: '/app/doctor/(commonLayout)/$id' })

  const { data: { data: doctorData } = { data: null } } =
    useGetDoctorDetailQuery({
      params: {
        doctorId: id,
      },
    })

  return (
    <>
      <Header title={t('detailTitle')} />
      <div className="flex flex-col items-center gap-[16px] p-[16px] pb-[120px]">
        <DoctorInfoHeader
          avatarUrl={doctorData?.avatarUrl ?? ''}
          name={doctorData?.name ?? ''}
          specialties={doctorData?.specialties ?? []}
          experienceYears={doctorData?.experienceYears ?? 0}
        />
        <DoctorConsultationFee
          consultationFee={doctorData?.consultationFee ?? 0}
        />
        {doctorData?.bio && <AboutDoctor bio={doctorData?.bio ?? ''} />}
        {doctorData?.branches && doctorData?.branches?.length > 0 && (
          <DoctorCurrentLocation branches={doctorData?.branches ?? []} />
        )}
        {doctorData?.educations?.length &&
          doctorData?.educations?.length > 0 && (
            <DoctorEducationCertifications
              educations={doctorData?.educations ?? []}
            />
          )}
        <DoctorActions />
      </div>
    </>
  )
}
