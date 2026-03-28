import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppStore = {
  popup: boolean
  setPopup: (popup: boolean) => void
  activeCountry: 'VN' | 'KH'
  setActiveCountry: (country: 'VN' | 'KH') => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      popup: true,
      setPopup: (popup) => set({ popup: popup }),
      activeCountry: 'VN',
      setActiveCountry: (country) => set({ activeCountry: country }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        activeCountry: state.activeCountry,
      }),
    },
  ),
)
