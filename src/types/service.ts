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
  /** CR-02: mã phân loại UI (01 xe/02 hotel/03 combo/04 phiên dịch/05 xe riêng). Xem `DATA_TYPE`. */
  dataTypeCode?: string
  /** CR-01: giới hạn số lượng tối đa 1 lịch hẹn được chọn. null → FE tự set trần 99. */
  maxQuantity?: number | null
  /** CR-02: true = thuộc diện KM First100 (BE trả Boolean). */
  promoEligible?: boolean
  /** CR-02: giá khứ hồi (2W) gốc — chỉ có ở dataType 01 & 05. */
  originalPrice2?: number
  /** CR-02: giá khứ hồi (2W) sau KM — ưu tiên dùng nếu > 0. */
  promotionPrice2?: number
  /** CR-02: mã BCCS 1 chiều (1W_*). */
  bccsServiceCode?: string
  /** CR-02: mã BCCS khứ hồi (2W_*). */
  bccsServiceCode2?: string
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
