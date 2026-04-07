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
    <>
      <Header title="Doctor Details" />
      <div className="flex flex-col items-center gap-[16px] p-[16px] pb-[120px]">
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
        {doctorData?.branches && doctorData?.branches?.length > 0 && (
          <DoctorCurrentLocation
            hospitalName={doctorData?.branches[0].nameVi ?? ''}
            address={doctorData?.branches[0].detailedAddress ?? ''}
            branches={doctorData?.branches ?? []}
          />
        )}
        <DoctorEducationCertifications
          certifications={doctorData?.certifications ?? ''}
        />
        <DoctorActions />
      </div>
    </>
  )
}
