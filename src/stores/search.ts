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
        if (!query.trim()) return

        const current = get().recentSearches

        const filtered = current.filter((q) => q !== query)

        const updated = [query, ...filtered].slice(0, 10)

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
    },
  ),
)
