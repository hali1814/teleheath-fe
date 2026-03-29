import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SearchStore = {
  recentSearches: string[]

  addRecent: (query: string) => void
  removeRecent: (query: string) => void
  clearRecent: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      recentSearches: [],

      addRecent: (query) => {
        const trimmed = query.trim()
        if (trimmed.length === 0) return

        const current = get().recentSearches
        const lower = trimmed.toLowerCase()

        const filtered = current.filter(
          (q) => q.trim().toLowerCase() !== lower,
        )

        const updated = [trimmed, ...filtered].slice(0, 5)

        set({ recentSearches: updated })
      },

      removeRecent: (query) => {
        set({
          recentSearches: get().recentSearches.filter((q) => q !== query),
        })
      },

      clearRecent: () => {
        set({ recentSearches: [] })
      },
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<SearchStore> | undefined
        const list = p?.recentSearches
        if (Array.isArray(list) && list.length > 5) {
          return {
            ...current,
            ...p,
            recentSearches: list.slice(0, 5),
          }
        }
        return { ...current, ...p }
      },
    },
  ),
)
