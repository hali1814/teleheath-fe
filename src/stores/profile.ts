import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { PatientProfileResponse } from '#/services/query/profile/getProfile'

const PROFILE_STORAGE_KEY = 'telehealth-profile'

type ProfileState = {
  profile: PatientProfileResponse | null
  setProfile: (user: PatientProfileResponse | null) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (user) => set({ profile: user }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: PROFILE_STORAGE_KEY,
      partialize: (s) => ({ profile: s.profile }),
    },
  ),
)

export function clearProfile() {
  useProfileStore.getState().clearProfile()
}
