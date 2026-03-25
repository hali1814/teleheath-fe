import type { Specialty } from './specialty'
import type { Country } from './country'

export interface WorkingHour {
  day: string
  open: boolean
  openTime: string | null
  closeTime: string | null
}

export type HospitalStatus = 'ACTIVE' | 'INACTIVE'

export interface Doctor {
  doctorId: string
  branchId: string
  hospitalId: string
  country: Country
  avatarUrl: string
  nameVi: string
  nameKh: string
  nameEn: string
  gender: string
  bioVi: string
  bioKh: string
  bioEn: string
  experienceYears: number
  consultationType: string
  consultationFee: number
  certifications: string
  status: string
  specialties: Specialty[]
}
