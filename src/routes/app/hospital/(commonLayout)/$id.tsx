import {
  HospitalDetailHeader,
  GalleryImage,
  AboutHospital,
  SpecialtyList,
  BranchList,
} from '#/sections/hospital'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/hospital/(commonLayout)/$id')({
  component: RouteComponent,
})

const hospital = {
  name: 'Tam Anh Hospital',
  website: 'tamanhhospital.vn',
  images: ['/thumbnail.png', '/thumbnail.png', '/thumbnail.png'],
  aboutUs:
    'Tam Anh General Hospital System is a prestigious 5-star healthcare network in Vietnam, recognized for its excellence in medical examination, treatment, and patient-centered care. The system is supported by a team of highly experienced professors, specialists, and doctors with outstanding professional expertise and dedication to medical ethics.',
  specialties: [
    'Specialty 1',
    'Specialty 2',
    'Specialty 3',
    'Specialty 4',
    'Specialty 5',
    'Specialty 6',
    'Specialty 7',
    'Specialty 8',
    'Specialty 9',
    'Specialty 10',
  ],
  branches: [
    {
      name: 'Branch 1',
      address: 'Address 1',
      phone: 'Phone 1',
      email: 'Email 1',
      working_hours: {
        mon_sat: '8:00 - 17:00',
        sun: 'Closed',
        emergency: '24/7',
      },
    },
    {
      name: 'Branch 2',
      address: 'Address 2',
      phone: 'Phone 2',
      email: 'Email 2',
      working_hours: {
        mon_sat: '8:00 - 17:00',
        sun: 'Closed',
        emergency: '24/7',
      },
    },
    {
      name: 'Branch 3',
      address: 'Address 3',
      phone: 'Phone 3',
      email: 'Email 3',
      working_hours: {
        mon_sat: '8:00 - 17:00',
        sun: 'Closed',
        emergency: '24/7',
      },
    },
  ],
}

function RouteComponent() {
  return (
    <>
      <HospitalDetailHeader name={hospital.name} website={hospital.website} />
      <div className="flex flex-col gap-[16px] p-[16px]">
        <GalleryImage images={hospital.images} />
        <AboutHospital aboutUs={hospital.aboutUs} />
        <SpecialtyList specialties={hospital.specialties} />
        <BranchList branches={hospital.branches} />
      </div>
    </>
  )
}
