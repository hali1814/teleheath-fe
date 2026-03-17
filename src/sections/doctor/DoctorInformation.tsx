import {
  DoctorInfoHeader,
  DoctorConsultationFee,
  AboutDoctor,
  DoctorCurrentLocation,
  DoctorEducationCertifications,
  DoctorActions,
} from '#/sections/doctor'

export default function DoctorInformation() {
  return (
    <div className="flex flex-col items-center gap-[16px]">
      <DoctorInfoHeader />
      <DoctorConsultationFee />
      <AboutDoctor />
      <DoctorCurrentLocation />
      <DoctorEducationCertifications />
      <DoctorActions />
    </div>
  )
}
