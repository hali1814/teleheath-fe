import {
  DoctorInfoHeader,
  DoctorConsultationFee,
  AboutDoctor,
  DoctorCurrentLocation,
  DoctorEducationCertifications,
  DoctorActions,
} from '#/sections/doctor'

const doctor = {
  avatar: '/doctor.png',
  name: 'Dr. Nguyen Duc Anh',
  specialty: 'Obstetrics and Gynecology',
  experienceYears: 12,
  consultationFee: 50,
  about:
    'Dr. Nguyen Duc Anh is a highly dedicated specialist in Obstetrics and Gynecology, with extensive experience in providing comprehensive healthcare for women. Known for his clinical expertise and empathetic approach, he specializes in managing high-risk pregnancies, gynecological disorders, and minimally invasive surgeries.',
}

export default function DoctorInformation() {
  return (
    <div className="flex flex-col items-center gap-[16px]">
      <DoctorInfoHeader {...doctor} />
      <DoctorConsultationFee consultationFee={doctor.consultationFee} />
      <AboutDoctor about={doctor.about} />
      <DoctorCurrentLocation />
      <DoctorEducationCertifications />
      <DoctorActions />
    </div>
  )
}
