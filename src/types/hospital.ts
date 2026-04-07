import type { Specialty } from './specialty'
import type { Country } from './country'

export interface WorkingHour {
  dayOfWeek: string
  morningStart: string | null
  morningEnd: string | null
  afternoonStart: string | null
  afternoonEnd: string | null
  closed: boolean
}

export type HospitalStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING'

export interface Hospital {
  hospitalId: number
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  country: Country
  logoUrl: string
  thumbnailUrl: string
  website: string
  about: string
  aboutEn: string
  aboutVi: string
  aboutKh: string
  status: string
  isFeatured: boolean
  specialties: Specialty[]
  gallery: string[]
  branches: Branch[]
  branchId: number
  isHeadquarters: boolean
  contactNumber1: string
  workEmail: string
  province: string
  detailedAddress: string
  googleMapsEmbed: string
  depositRequired: boolean
  depositFee: number
  emergency24h: boolean
}

export interface Branch {
  branchId: number
  hospitalId: number
  isHeadquarters: boolean
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  country: Country
  province: {
    id: number
    nameVi: string
    nameEn: string
  }
  district: {
    id: number
    nameVi: string
    nameEn: string
  }
  street: string
  detailedAddress: string
  contactNumber1: string
  workEmail: string
  googleMapsEmbed: string
  workingHours: WorkingHour[]
  status: string
  consultationFee: number
  depositRequired: boolean
  depositFee: number
  emergency24h: boolean
}

export interface Service {
  id: number
  name: string
  description: string
  iconUrl: string
  price: number
  currency: string
}
