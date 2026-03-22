import type { IconName } from '#/components/icon'

export const consultationTypes = [
  {
    title: 'Standard Consultation',
    benefits: [
      'You can access our top general practitioners with standard wait times and a comfortable waiting area. VIP lounge access',
    ],
  },
  {
    title: 'VIP Consultation',
    benefits: [
      'Priority booking (Zero wait time)',
      'Consultation with Senior Specialists',
      'Dedicated health concierge',
      'Exclusive VIP lounge access',
    ],
  },
]

export const specialties = [
  {
    name: 'Cardiology',
    icon: 'appointment',
  },
  {
    name: 'Dermatology',
    icon: 'work_history_outline',
  },
] satisfies { name: string; icon: IconName }[]

export const locations = [
  {
    name: 'Tam Anh Hospital, Ho Chi Minh City',
    address:
      '2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam',
  },
  {
    name: 'Tam Anh Hospital, District 8',
    address:
      '16C Pham Hung Street, Ward 5, District 8, Ho Chi Minh City, Vietnam',
  },
]

export const slotTimesMorning = [
  {
    time: '09:00 - 10:00',
    disabled: false,
  },
  {
    time: '10:00 - 11:00',
    disabled: false,
  },
  {
    time: '11:00 - 12:00',
    disabled: false,
  },
  {
    time: '12:00 - 13:00',
    disabled: true,
  },
]

export const patientProfiles = [
  {
    patientID: '1234567890',
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    phone: '+855 96 789 0123',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: '1990-01-01',
    avatar: '/doctor.png',
  },
  {
    patientID: '1234567891',
    name: 'Bopha Chan',
    age: 30,
    gender: 'Male',
    phone: '+855 96 789 0123',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: '1990-01-01',
    avatar: '/doctor.png',
  },
  {
    patientID: '1234567892',
    name: 'Sonnitha',
    age: 30,
    gender: 'Male',
    phone: '+855 96 789 0123',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: '1990-01-01',
    avatar: '/doctor.png',
  },
]
