import { create } from 'zustand'

import type { AuthCamIDUser } from '#/services/query/auth/authCamID'

type ProfileState = {
  profile: AuthCamIDUser | null
  setProfile: (user: AuthCamIDUser | null) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (user) => set({ profile: user }),
  clearProfile: () => set({ profile: null }),
}))

export function clearProfile() {
  useProfileStore.getState().clearProfile()
}
