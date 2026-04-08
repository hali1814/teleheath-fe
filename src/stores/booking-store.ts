import type { ListFamilyPatient } from '#/services/query/profile/listFamily'
import type { Branch, Hospital, Service } from '#/types/hospital'
import type { Doctor } from '#/types/doctor'
import type { Specialty } from '#/types/specialty'
import { create } from 'zustand'
import type { Package } from '#/types/package'
import type { Room } from '#/services/query/branch/list-room'
import type { ServiceType } from '#/types/service'

export type FileRowStatus = 'uploading' | 'success' | 'error'

export type MedicalFileRow = {
  id: string
  file: File
  fileId?: string
  status: FileRowStatus
}

const defaultFeeInfo = {
  consultationFee: 0,
  serviceFee: 0,
  totalAmount: 0,
}

export type BookingState = {
  step: number
  hospital?: Partial<Hospital>
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
  addonServiceTypes?: ServiceType[]
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
    totalAmount: number
  }
  thumbnailUrl?: string
  pickupTime?: string
  pickupDate?: string
  pickupNote?: string

  setStep: (step: number) => void
  next: () => void
  back: () => void
  setData: (data: Partial<BookingState>) => void
  /** Truyền danh sách dịch vụ từ API (vd list-service) để tính phí theo `serviceIds`. */
  calcFeeInfo: (consultationFee: number) => void
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
      const serviceFee =
        s.addonServiceTypes?.reduce((acc, addonServiceType) => {
          return acc + addonServiceType.price
        }, 0) ?? 0

      const next = {
        consultationFee,
        serviceFee,
        totalAmount: consultationFee,
      }
      const p = s.feeInfo
      if (
        p.consultationFee === next.consultationFee &&
        p.serviceFee === next.serviceFee &&
        p.totalAmount === next.totalAmount
      ) {
        return s
      }
      return { feeInfo: next }
    }),

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
      pickupDate: undefined,
      pickupNote: undefined,
    }),
}))
