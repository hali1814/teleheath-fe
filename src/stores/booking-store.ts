import type { ListFamilyPatient } from '#/services/query/profile/listFamily'
import type { Branch } from '#/types/hospital'
import type { Doctor } from '#/types/doctor'
import type { Specialty } from '#/types/specialty'
import { create } from 'zustand'
import type { Package } from '#/types/package'
import type { Room } from '#/services/query/branch/list-room'
import type { ServiceType } from '#/types/service'
import type { Hospital } from '#/entities/hospitalEntity'
import type { First100Banner } from '#/services/query/promotions/first100-banner'
import {
  DATA_TYPE,
  DEFAULT_MAX_QUANTITY,
  isCarDataType,
  TRIP_TYPE,
} from '#/const/addon'

export type FileRowStatus = 'uploading' | 'success' | 'error'

export type SelectedRoom = {
  checkInDate: string
  checkOutDate: string
  /** số đêm = checkOut - checkIn */
  nights: number
}

/**
 * Add-on đã chọn kèm dữ liệu CR-01/CR-02.
 * Kế thừa ServiceType để code cũ đọc `.id/.price/.promotionPrice/...` vẫn chạy.
 */
export interface SelectedAddon extends ServiceType {
  /** CR-01: số lượng (default 1; clamp theo maxQuantity; phiên dịch 04 luôn = 1). */
  quantity: number
  /** CR-02: 1 = một chiều, 2 = khứ hồi (chỉ dùng cho xe 01 & 05). */
  tripType: 1 | 2
  /** CR-02: chỉ hotel 02 — mỗi phòng 1 dòng. */
  rooms?: SelectedRoom[]
}

const clampQuantity = (qty: number, max?: number | null): number => {
  const ceiling = max ?? DEFAULT_MAX_QUANTITY
  return Math.min(Math.max(1, Math.trunc(qty || 1)), ceiling)
}

/** Đơn giá 1 đơn vị theo tripType (xe: 2W dùng promotionPrice2>0 → originalPrice2). */
const unitPriceOf = (a: SelectedAddon): number => {
  if (isCarDataType(a.dataTypeCode) && a.tripType === TRIP_TYPE.ROUND_TRIP) {
    return a.promotionPrice2 && a.promotionPrice2 > 0
      ? a.promotionPrice2
      : (a.originalPrice2 ?? a.price)
  }
  return a.promotionPrice && a.promotionPrice > 0 ? a.promotionPrice : a.price
}

/** Thành tiền 1 dòng add-on (hotel = Σ nights×đơn giá; còn lại = đơn giá×quantity). */
export const lineTotalOf = (a: SelectedAddon): number => {
  if (a.dataTypeCode === DATA_TYPE.HOTEL && a.rooms?.length) {
    const unit = unitPriceOf(a)
    return a.rooms.reduce((acc, r) => acc + (r.nights || 0) * unit, 0)
  }
  return unitPriceOf(a) * (a.quantity || 1)
}

/**
 * CR-02 §3.1: giảm `discount_percent`% cho 1 vé xe 01 khứ hồi ĐẦU TIÊN,
 * khi banner còn suất + đơn có combo đủ điều kiện + có xe 01 round-trip đủ điều kiện.
 * FE chỉ preview — điều kiện "lần đặt đầu tiên của user" do BE chốt lúc booking.
 */
const first100DiscountOf = (
  addons: SelectedAddon[],
  banner?: First100Banner,
): number => {
  if (!banner?.show_banner) return 0
  const hasCombo = addons.some(
    (a) => a.dataTypeCode === DATA_TYPE.COMBO && !!a.promoEligible,
  )
  const eligibleCar = addons.find(
    (a) =>
      a.dataTypeCode === DATA_TYPE.CAR &&
      !!a.promoEligible &&
      a.tripType === TRIP_TYPE.ROUND_TRIP,
  )
  if (!hasCombo || !eligibleCar) return 0
  const pct = (banner.discount_percent ?? 50) / 100
  return unitPriceOf(eligibleCar) * pct
}

export type MedicalFileRow = {
  id: string
  file: File
  fileId?: string
  status: FileRowStatus
}

const defaultFeeInfo = {
  consultationFee: 0,
  serviceFee: 0,
  discount: 0,
  totalAmount: 0,
}

export type BookingState = {
  step: number
  hospital?: Hospital
  branch?: Branch
  room?: Room
  doctor?: Partial<Doctor>
  specialty?: Specialty
  packageData?: Package
  bookingType?: 'HOSPITAL' | 'PACKAGE' | 'DOCTOR'
  patientProfile?: ListFamilyPatient
  appointmentDate?: Date
  startTime?: string
  endTime?: string
  notes?: string
  medicalHistory?: string
  serviceIds?: number[]
  addonServiceTypes?: SelectedAddon[]
  /** CR-02d: ghi chú tự do end-user nhập ở màn Review & Confirm. */
  customerNote?: string
  /** CR-02: trạng thái banner First100 (để tính discount preview + render). */
  first100Banner?: First100Banner
  /** UUID từ API upload file (medical records) */
  medicalFiles: MedicalFileRow[]
  paymentMethod?: {
    id: number
    name: string
    logo: string
  }
  feeInfo: {
    consultationFee: number
    serviceFee: number
    /** CR-02: tổng giảm giá (First100). */
    discount: number
    totalAmount: number
  }
  thumbnailUrl?: string
  pickupTime?: string
  pickupAddress?: string
  pickupNote?: string

  setStep: (step: number) => void
  next: () => void
  back: () => void
  setData: (data: Partial<BookingState>) => void
  /** Truyền danh sách dịch vụ từ API (vd list-service) để tính phí theo `serviceIds`. */
  calcFeeInfo: (consultationFee: number) => void
  /** CR-01: đổi số lượng 1 add-on (clamp theo maxQuantity). */
  setAddonQuantity: (id: number, quantity: number) => void
  /** CR-02: đổi chiều đi (1 một chiều / 2 khứ hồi) cho xe 01 & 05. */
  setAddonTripType: (id: number, tripType: 1 | 2) => void
  /** CR-02: cập nhật danh sách phòng cho hotel 02. */
  setAddonRooms: (id: number, rooms: SelectedRoom[]) => void
  appendMedicalFile: (id: string, file: File) => void
  updateMedicalFile: (id: string, fileId: string, status: FileRowStatus) => void
  removeMedicalFile: (id: string) => void
  reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 0,
  serviceIds: [],
  addonServiceTypes: [],
  medicalFiles: [],
  feeInfo: defaultFeeInfo,

  setStep: (step) => set({ step }),
  next: () => set((s) => ({ step: s.step + 1 })),
  back: () => set((s) => ({ step: s.step - 1 })),

  setData: (data) => set((s) => ({ ...s, ...data })),

  calcFeeInfo: (consultationFee: number) =>
    set((s) => {
      const addons = s.addonServiceTypes ?? []
      const gross = addons.reduce((acc, a) => acc + lineTotalOf(a), 0)
      const discount = first100DiscountOf(addons, s.first100Banner)
      const serviceFee = Math.max(0, gross - discount)

      const next = {
        consultationFee,
        serviceFee,
        discount,
        totalAmount: consultationFee + serviceFee,
      }
      const p = s.feeInfo
      if (
        p.consultationFee === next.consultationFee &&
        p.serviceFee === next.serviceFee &&
        p.discount === next.discount &&
        p.totalAmount === next.totalAmount
      ) {
        return s
      }
      return { feeInfo: next }
    }),

  setAddonQuantity: (id, quantity) =>
    set((s) => ({
      addonServiceTypes: (s.addonServiceTypes ?? []).map((a) =>
        a.id === id
          ? { ...a, quantity: clampQuantity(quantity, a.maxQuantity) }
          : a,
      ),
    })),

  setAddonTripType: (id, tripType) =>
    set((s) => ({
      addonServiceTypes: (s.addonServiceTypes ?? []).map((a) =>
        a.id === id ? { ...a, tripType } : a,
      ),
    })),

  setAddonRooms: (id, rooms) =>
    set((s) => ({
      addonServiceTypes: (s.addonServiceTypes ?? []).map((a) =>
        a.id === id ? { ...a, rooms } : a,
      ),
    })),

  appendMedicalFile: (id: string, file: File) =>
    set((s) => ({
      medicalFiles: [...s.medicalFiles, { id, file, status: 'uploading' }],
    })),

  updateMedicalFile: (id: string, fileId: string, status: FileRowStatus) =>
    set((s) => {
      const row = s.medicalFiles.find((x) => x.id === id)
      if (!row) return s
      return {
        medicalFiles: s.medicalFiles.map((x) =>
          x.id === id ? { ...row, fileId: fileId, status } : x,
        ),
      }
    }),

  removeMedicalFile: (id: string) =>
    set((s) => ({
      medicalFiles: s.medicalFiles.filter((x) => x.id !== id),
    })),

  reset: () =>
    set({
      step: 0,
      serviceIds: [],
      addonServiceTypes: [],
      customerNote: undefined,
      first100Banner: undefined,
      medicalFiles: [],
      feeInfo: defaultFeeInfo,
      hospital: undefined,
      branch: undefined,
      room: undefined,
      doctor: undefined,
      specialty: undefined,
      packageData: undefined,
      bookingType: undefined,
      patientProfile: undefined,
      appointmentDate: undefined,
      startTime: undefined,
      endTime: undefined,
      notes: undefined,
      medicalHistory: undefined,
      paymentMethod: undefined,
      thumbnailUrl: undefined,
      pickupTime: undefined,
      pickupAddress: undefined,
      pickupNote: undefined,
    }),
}))
