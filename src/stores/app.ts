import { create } from 'zustand'

type AppStore = {
  popup: boolean
  setPopup: (popup: boolean) => void
  activeCountry: 'VN' | 'KH'
  setActiveCountry: (country: 'VN' | 'KH') => void
}

export const useAppStore = create<AppStore>()(
  (set) => ({
    popup: true,
    setPopup: (popup) => set({ popup: popup }),
    activeCountry: 'VN',
    setActiveCountry: (country) => set({ activeCountry: country }),
  }),
)
