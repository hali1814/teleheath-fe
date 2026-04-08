export interface Service {
  id: number
  name: string
  description: string
  iconUrl: string
  price: number
  currency: string
}

export interface Amenity {
  name: string
  iconUrl: string
}

export interface Partner {
  id: number
  addonServiceId: number
  addonServiceName: string
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
  photoUrl: string
  country: string
  distanceFromHospital: string
  address: string
  serviceTypeId: number
  typeName: string
  price: number
  amenities: Amenity[]
}

export interface ServiceType {
  id: number
  isBest: boolean
  typeName: string
  originalPrice: number
  price: number
  promotionPrice: number
  description: string
  addonServiceId: number
  addonServiceName: string
  partnerId: number
  partnerName: string
  partner: {
    id: number
    name: string
    nameVi: string
    nameEn: string
    nameKh: string
    photoUrl: string
    country: {
      code: string
      nameVi: string
      nameEn: string
    }[]
    address: string
    distanceFromHospital: string
  }
  amenities: {
    name: string
    iconUrl: string
  }[]
}
