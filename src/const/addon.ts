/**
 * Phân loại add-on để render UI (CR-02). Khớp `dataTypeCode` từ API add-on service types.
 * 01 = Xe lẻ (Normal/Limousine), 02 = Nhà nghỉ/khách sạn lẻ, 03 = Combo,
 * 04 = Phiên dịch, 05 = Private car (xe riêng).
 */
export const DATA_TYPE = {
  CAR: '01',
  HOTEL: '02',
  COMBO: '03',
  TRANSLATOR: '04',
  PRIVATE_CAR: '05',
} as const

export type DataTypeCode = (typeof DATA_TYPE)[keyof typeof DATA_TYPE]

/** Chiều đi của vé xe (CR-02). 1 = một chiều (mã 1W_*), 2 = khứ hồi (mã 2W_*). */
export const TRIP_TYPE = {
  ONE_WAY: 1,
  ROUND_TRIP: 2,
} as const

export type TripType = (typeof TRIP_TYPE)[keyof typeof TRIP_TYPE]

/** Khi BE trả maxQuantity = null thì FE tự set trần này (CR-01 / doc mock). */
export const DEFAULT_MAX_QUANTITY = 99

/** dataTypeCode có toggle Round Trip + đơn giá khứ hồi (2W). */
export const isCarDataType = (dataTypeCode?: string) =>
  dataTypeCode === DATA_TYPE.CAR || dataTypeCode === DATA_TYPE.PRIVATE_CAR
