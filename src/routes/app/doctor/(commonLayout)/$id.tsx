import type { IconName } from '#/components/icon'
import {
  DoctorInfoHeader,
  DoctorConsultationFee,
  AboutDoctor,
  DoctorCurrentLocation,
  DoctorEducationCertifications,
  DoctorActions,
} from '#/sections/doctor'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/doctor/(commonLayout)/$id')({
  component: RouteComponent,
})

const doctor = {
  avatar: '/doctor.png',
  name: 'Dr. Nguyen Duc Anh',
  specialty: 'Obstetrics and Gynecology',
  experienceYears: 12,
  consultationFee: 50,
  about:
    'Dr. Nguyen Duc Anh is a highly dedicated specialist in Obstetrics and Gynecology, with extensive experience in providing comprehensive healthcare for women. Known for his clinical expertise and empathetic approach, he specializes in managing high-risk pregnancies, gynecological disorders, and minimally invasive surgeries.',
  hospitalName: 'Tam Anh Hospital',
  address:
    '2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam',
  educationCertifications: [
    {
      icon: 'graduate_cap' as IconName,
      title: 'Doctor of Medicine (MD)',
      description: 'Ho Chi Minh City University of Medicine and Pharmacy',
    },
    {
      icon: 'seal_check' as IconName,
      title: 'Specialist Level I in Obstetrics and Gynecology',
      description: 'Pham Ngoc Thach University of Medicine',
    },
    {
      icon: 'license' as IconName,
      title: 'Medical Practice License',
      description: 'Issued by Ho Chi Minh City Department of Health',
    },
  ],
}

function RouteComponent() {
  return (
    <div className="flex flex-col items-center gap-[16px] p-[16px]">
      <DoctorInfoHeader {...doctor} />
      <DoctorConsultationFee consultationFee={doctor.consultationFee} />
      <AboutDoctor about={doctor.about} />
      <DoctorCurrentLocation
        hospitalName={doctor.hospitalName}
        address={doctor.address}
      />
      <DoctorEducationCertifications
        educationCertifications={doctor.educationCertifications}
      />
      <DoctorActions />
    </div>
  )
}
