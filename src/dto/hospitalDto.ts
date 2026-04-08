import type { IPagingResponse } from '#/model/paging.model'

export interface ApiCountry {
  code: string
  nameVi: string
  nameEn: string
}

export interface ApiProvince {
  id: number
  nameVi: string
  nameEn: string
}

export interface ApiDistrict {
  id: number
  nameVi: string
  nameEn: string
}

export interface ApiSpecialty {
  id: number
  name: string
  nameEn: string
  nameVi: string
  nameKh: string
  description: string
  iconUrl: string
}

export interface ApiWorkingHour {
  dayOfWeek: string
  morningStart: string
  morningEnd: string
  afternoonStart: string
  afternoonEnd: string
  closed: boolean
}

export interface ApiBranch {
  branchId: number
  hospitalId: number
  isHeadquarters: boolean
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  country: ApiCountry
  province: ApiProvince
  district: ApiDistrict
  street: string
  detailedAddress: string
  contactNumber1: string
  workEmail: string
  googleMapsEmbed: string
  status: string
  consultationFee: number
  depositRequired: boolean
  depositFee: number
  emergency24h: boolean
  workingHours: ApiWorkingHour[]
}

export interface ApiHospital {
  hospitalId: number
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  country: ApiCountry
  logoUrl: string
  thumbnailUrl: string
  website: string
  about: string
  aboutEn: string
  aboutVi: string
  aboutKh: string
  status: string
  isFeatured: boolean
  specialties: ApiSpecialty[]
  gallery: string[]
  branches: ApiBranch[]
  // Branch-specific fields that may be present at root level:
  branchId: number
  isHeadquarters: boolean
  contactNumber1: string
  workEmail: string
  province: string // Unclear if this is province name or object — kept as string as per sample
  detailedAddress: string
  googleMapsEmbed: string
  depositRequired: boolean
  depositFee: number
  emergency24h: boolean
}

export interface ApiHospitalList extends IPagingResponse<ApiHospital> {}

export type ApiTopHospitals = ApiHospital[]
