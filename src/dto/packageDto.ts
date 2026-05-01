import type { IPagingResponse } from '#/model/paging.model'

export interface CountryDto {
  code: string
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
}

export interface CheckupTypeDto {
  id: number
  name: string
  nameEn: string
  nameVi: string
  nameKh: string
  status: string
  specialtyId: number
  specialtyNameEn: string
}

export interface ProvinceDto {
  id: number
  nameVi: string
  nameEn: string
}

export interface DistrictDto {
  id: number
  nameVi: string
  nameEn: string
}

export interface WorkingHourDto {
  dayOfWeek: string
  morningStart: string
  morningEnd: string
  afternoonStart: string
  afternoonEnd: string
  closed: boolean
}

export interface BranchDto {
  branchId: number
  hospitalId: number
  isHeadquarters: boolean
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  country: CountryDto
  province: ProvinceDto
  district: DistrictDto
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
  workingHours: WorkingHourDto[]
}

export interface HospitalDto {
  hospitalId: number
  name: string
  nameVi: string
  nameEn: string
  country: CountryDto
  logoUrl: string
  thumbnailUrl: string
  branchCount: number
  branches: BranchDto[]
}

export interface ApiPackage {
  id: number
  name: string
  description: string
  imageUrl: string
  category: string
  price: number
  promotionPrice?: number | null
  promotionStart?: string | null
  promotionEnd?: string | null
  durationMinutes: number
  countries: CountryDto[]
  checkupTypes: CheckupTypeDto[]
  hospital: HospitalDto
  active: boolean
  specialized: boolean
}

export interface ApiPackageList extends IPagingResponse<ApiPackage> {}
