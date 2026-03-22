import { create } from 'zustand'

type BookingState = {
  step: number
  consultationType?: string
  specialty?: string
  location?: string
  /** Giờ khám (slot), ví dụ "09:00" */
  schedules?: string[]
  /** Ngày khám — dùng với Calendar controlled */
  appointmentDate?: Date
  patient?: string

  setStep: (step: number) => void
  next: () => void
  back: () => void
  setData: (data: Partial<BookingState>) => void
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 0,

  setStep: (step) => set({ step }),
  next: () => set((s) => ({ step: s.step + 1 })),
  back: () => set((s) => ({ step: s.step - 1 })),

  setData: (data) => set((s) => ({ ...s, ...data })),
}))
