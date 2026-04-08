import type { IPagingResponse } from '#/model/paging.model'

export interface Country {
  code: string
  nameVi: string
  nameEn: string
}

export interface ProvinceOrDistrict {
  id: number
  nameVi: string
  nameEn: string
}

export interface WorkingHour {
  dayOfWeek: string
  morningStart: string
  morningEnd: string
  afternoonStart: string
  afternoonEnd: string
  closed: boolean
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
  province: ProvinceOrDistrict
  district: ProvinceOrDistrict
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
  workingHours: WorkingHour[]
}

export interface Specialty {
  id: number
  name: string
  nameEn: string
  nameVi: string
  nameKh: string
  description: string
  iconUrl: string
}

export interface Education {
  id: number
  certification: string
  medicalSchool: string
  graduationYear: number
  certificateUrl: string
}

export interface ApiDoctor {
  doctorId: number
  hospitalId: number
  country: Country
  branches: Branch[]
  avatarUrl: string
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  gender: string
  bio: string
  bioVi: string
  bioKh: string
  bioEn: string
  experienceYears: number
  consultationType: string
  consultationFee: number
  certifications: string
  status: string
  isTop: boolean
  specialties: Specialty[]
  educations: Education[]
}

export interface ApiDoctorList extends IPagingResponse<ApiDoctor> {}
