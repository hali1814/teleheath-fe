import { create } from 'zustand'

import type { PatientProfileResponse } from '#/services/query/profile/getProfile'

type ProfileState = {
  profile: PatientProfileResponse | null
  setProfile: (user: PatientProfileResponse | null) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  setProfile: (user) => set({ profile: user }),
  clearProfile: () => set({ profile: null }),
}))

export function clearProfile() {
  useProfileStore.getState().clearProfile()
}
