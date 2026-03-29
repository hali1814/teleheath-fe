import type { Specialty } from './specialty'
import type { Country } from './country'

export interface WorkingHour {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
  open: boolean
  openTime: string | null
  closeTime: string | null
}

export type HospitalStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING'

export interface Hospital {
  hospitalId: string
  nameVi: string
  nameKh: string
  nameEn: string
  country: Country
  address: string
  lat: number
  lng: number
  thumbnailUrl: string
  logoUrl: string
  website: string
  description: string
  aboutEn: string
  aboutKh: string
  gallery: string[]
  workingHours: {
    day: string
    open: boolean
    openTime: string
    closeTime: string
  }[]
  timezone: string
  status: string
  specialties: Specialty[]
  emergencySupport: boolean
}

export interface Branch {
  branchId: string
  hospitalId: string
  nameVi: string
  nameKh: string
  nameEn: string
  hotline: string
  email: string
  address: string
  lat: number
  lng: number
  workingHours: WorkingHour[]
  status: 'ACTIVE' | 'INACTIVE' | string
  depositRequired: boolean
  depositFee: number | null
  emergencySupport: boolean
  additionalServices: Service[]
}

export interface Service {
  id: number
  name: string
  description: string
  iconUrl: string
  price: number
  currency: string
}
