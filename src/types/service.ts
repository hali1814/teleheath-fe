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
  serviceType: string
  name: string
  nameVi: string
  nameEn: string
  nameKh: string
  photoUrl: string
  country: string
  distanceFromHospital: string
  serviceTypeId: number
  typeName: string
  price: number
  amenities: Amenity[]
}
