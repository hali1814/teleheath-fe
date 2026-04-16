import { create } from 'zustand'

interface ProfileEditLayoutTitleState {
  title: string
  setTitle: (title: string) => void
}

export const useProfileEditLayoutTitleStore = create<ProfileEditLayoutTitleState>(
  (set) => ({
    title: '',
    setTitle: (title) => set({ title }),
  }),
)
