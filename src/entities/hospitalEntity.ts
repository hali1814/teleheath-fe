interface Specialty {
  id: number
  name: string
  iconUrl: string
}

interface Branch {
  id: number
  name: string
  phone: string
  email: string
  address: string
  googleMaps: string
  operatingHours: Record<string, string>
}

export interface Hospital {
  hospitalId: number
  thumbnailUrl: string
  logoUrl: string
  name: string
  website: string
  country: string
  address: string
  gallery: string[]
  about: string
  specialties: Specialty[]
  branches: Branch[]
  emergency24h: boolean
}
