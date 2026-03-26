import type { ListBranchesResponse } from '#/services/query/hospital/list-branches'
import type { ListConsultationResponse } from '#/services/query/hospital/list-consultation'
import type { Specialty } from '#/services/query/hospital/list-specialty'
import type { Package } from '#/services/query/package/list-packages'
import type {
  ListFamilyPatient,
  ListFamilyResponse,
} from '#/services/query/profile/listFamily'
import { create } from 'zustand'

export type BookingState = {
  step: number
  hospitalId?: string
  branch?: ListBranchesResponse
  consultationTier?: ListConsultationResponse
  doctor?: string
  specialty?: Specialty
  package?: Package
  bookingType?: 'HOSPITAL' | 'PACKAGE' | 'DOCTOR'
  patientProfile?: ListFamilyPatient
  appointmentDate?: Date
  startTime?: string
  endTime?: string
  notes?: string
  medicalHistory?: string
  serviceIds: number[]
  /** UUID từ API upload file (medical records) */
  medicalFileIds: string[]

  setStep: (step: number) => void
  next: () => void
  back: () => void
  setData: (data: Partial<BookingState>) => void
  appendFileId: (id: string) => void
  removeFileId: (id: string) => void
  reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 0,
  serviceIds: [],
  medicalFiles: [],

  setStep: (step) => set({ step }),
  next: () => set((s) => ({ step: s.step + 1 })),
  back: () => set((s) => ({ step: s.step - 1 })),

  setData: (data) => set((s) => ({ ...s, ...data })),

  appendFileId: (id) => set((s) => ({ medicalFiles: [...s.medicalFiles, id] })),

  removeFileId: (id) =>
    set((s) => ({
      medicalFiles: s.medicalFiles.filter((x) => x !== id),
    })),

  reset: () =>
    set({
      step: 0,
      serviceIds: [],
      medicalFiles: [],
      hospitalId: undefined,
      branch: undefined,
      consultationTier: undefined,
      doctor: undefined,
      specialty: undefined,
      package: undefined,
      bookingType: undefined,
      patientProfile: undefined,
      appointmentDate: undefined,
      startTime: undefined,
      endTime: undefined,
      notes: undefined,
      medicalHistory: undefined,
    }),
}))
