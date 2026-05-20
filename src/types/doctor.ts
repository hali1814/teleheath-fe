import type { Specialty } from './specialty'
import type { Country } from './country'
import type { Branch } from './hospital'

export interface WorkingHour {
  day: string
  open: boolean
  openTime: string | null
  closeTime: string | null
}

export type HospitalStatus = 'ACTIVE' | 'INACTIVE'

export interface Doctor {
  doctorId: string
  hospitalId: string
  country: Country | null
  branches: Branch[]
  avatarUrl: string
  name?: string
  nameVi: string
  nameKh: string | null
  nameEn: string
  gender: string
  bio?: string
  bioVi: string
  bioKh: string | null
  bioEn: string
  experienceYears: number
  consultationType: string
  consultationFee: number
  certifications: string
  status: HospitalStatus | string
  isTop: boolean
  specialties: Specialty[]
}
