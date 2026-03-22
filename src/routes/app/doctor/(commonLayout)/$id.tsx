import {
  DoctorInfoHeader,
  DoctorConsultationFee,
  AboutDoctor,
  DoctorCurrentLocation,
  DoctorEducationCertifications,
  DoctorActions,
} from '#/sections/doctor'
import { useGetDoctorDetailQuery } from '#/services/query/doctor/doctor-detail'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/app/doctor/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/app/doctor/(commonLayout)/$id' })

  const { data: { data: doctorData } = { data: null } } =
    useGetDoctorDetailQuery({
      params: {
        doctorId: id,
      },
    })

  return (
    <div className="flex flex-col items-center gap-[16px] p-[16px]">
      <DoctorInfoHeader {...doctorData} />
      <DoctorConsultationFee
        consultationFee={doctorData?.consultationFee ?? 0}
      />
      <AboutDoctor {...doctorData} />
      <DoctorCurrentLocation
        hospitalName={doctorData?.hospitalName ?? ''}
        address={doctorData?.address ?? ''}
      />
      <DoctorEducationCertifications
        educationCertifications={doctorData?.educationCertifications ?? []}
      />
      <DoctorActions />
    </div>
  )
}
