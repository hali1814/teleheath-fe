interface Branch {
  id: number
  name: string
  address: string
}

export interface Package {
  packageId: number
  imageUrl: string
  name: string
  price: number
  countryName: string
  description: string
  hospitalName: string
  branches: Branch[]
  checkupTypes: string[]
}
