import type { Country } from './country'
import type { Branch } from './hospital'

export interface WorkingHour {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
  open: boolean
  openTime: string | null // e.g. "07:00" or null if closed
  closeTime: string | null // e.g. "17:00" or null if closed
}

export interface Hospital {
  hospitalId: string
  nameVi: string
  nameKh: string | null
  nameEn: string
  country: Country
  logoUrl: string
  branchCount: number
  branches: Branch[]
}

export interface PackageInclusion {
  name: string
  description: string
}

export interface Package {
  id: number
  name: string
  description: string
  category: string
  price: number
  durationMinutes: number
  imageUrl: string
  countries: Country[]
  hospital: Hospital
  inclusions: PackageInclusion[]
  active: boolean
}
