import { create } from 'zustand'

export type BookingState = {
  step: number
  hospitalId?: string
  branchId?: string
  consultationTierId?: number
  doctorId?: string
  specialtyId?: number
  packageId?: number
  bookingType?: 'HOSPITAL' | 'PACKAGE' | 'DOCTOR'
  patientId?: number
  appointmentDate?: Date
  startTime?: string
  endTime?: string
  notes?: string
  medicalHistory?: string
  serviceIds: number[]
  /** UUID từ API upload file (medical records) */
  medicalFiles: string[]

  setStep: (step: number) => void
  next: () => void
  back: () => void
  setData: (data: Partial<BookingState>) => void
  appendFileId: (id: string) => void
  removeFileId: (id: string) => void
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
}))
