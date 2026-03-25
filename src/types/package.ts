import type { Country } from './country'

export interface Hospital {
  hospitalId: string
  nameVi: string
  nameEn: string
  country: Country
  logoUrl: string
  branchCount: number
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
  hospitals: Hospital[]
  inclusions: PackageInclusion[]
  active: boolean
}
