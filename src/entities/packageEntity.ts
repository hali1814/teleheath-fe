interface Branch {
  id: number
  name: string
  address: string
}

export interface CheckupTypeEntity {
  name: string
  description?: string
}

export interface Package {
  packageId: number
  imageUrl: string
  promotionPrice: number
  name: string
  price: number
  countryName: string
  description: string
  hospitalName: string
  branches: Branch[]
  checkupTypes: CheckupTypeEntity[]
}
