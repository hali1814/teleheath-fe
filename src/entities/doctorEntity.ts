interface Branch {
  id: number
  name: string
  address: string
}

export interface Doctor {
  doctorId: number
  avatarUrl: string
  name: string
  specialties: string[]
  countryName: string
  experienceYears: number
  consultationFee: number
  bio: string
  educations: string[]
  branches: Branch[]
}
