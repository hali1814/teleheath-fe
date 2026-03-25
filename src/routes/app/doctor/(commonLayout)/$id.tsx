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
    <div className="flex flex-col items-center gap-[16px] p-[16px] pb-[165px]">
      <DoctorInfoHeader
        avatarUrl={doctorData?.avatarUrl ?? ''}
        nameVi={doctorData?.nameVi ?? ''}
        nameKh={doctorData?.nameKh ?? ''}
        nameEn={doctorData?.nameEn ?? ''}
        specialties={doctorData?.specialties ?? []}
        experienceYears={doctorData?.experienceYears ?? 0}
      />
      <DoctorConsultationFee
        consultationFee={doctorData?.consultationFee ?? 0}
      />
      <AboutDoctor
        bioVi={doctorData?.bioVi ?? ''}
        bioKh={doctorData?.bioKh ?? ''}
        bioEn={doctorData?.bioEn ?? ''}
      />
      <DoctorCurrentLocation
        hospitalName={doctorData?.hospitalName ?? 'Tam Anh Hospital'}
        address={
          doctorData?.address ??
          '2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam'
        }
      />
      <DoctorEducationCertifications
        certifications={doctorData?.certifications ?? ''}
      />
      <DoctorActions />
    </div>
  )
}
