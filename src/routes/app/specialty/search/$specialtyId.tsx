import SearchBar from '#/components/SearchBar'
import { Spinner } from '#/components/ui/spinner'
import useDebounce from '#/hooks/use-debounce'
import { Header } from '#/sections/home'
import {
  RecentSearches,
  Suggestions,
  SearchTabs,
  SearchResults,
  EmptyState,
} from '#/sections/search'
import { useGetSearchQuery } from '#/services/query/search/search'
import { useGetSuggestionQuery } from '#/services/query/search/suggestion'
import { useSpecialtySearchStore } from '#/stores/search'
import { keepPreviousData } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

const specialtySearchSchema = z.object({
  specialtyName: z.string(),
})

export type SpecialtySearch = z.infer<typeof specialtySearchSchema>

export const Route = createFileRoute('/app/specialty/search/$specialtyId')({
  component: RouteComponent,
  validateSearch: specialtySearchSchema,
})

export type Tab = 'ALL' | 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

function RouteComponent() {
  const { specialtyId } = Route.useParams()
  const { specialtyName } = Route.useSearch()
  const [query, setQuery] = useState('')
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null)
  const [status, setStatus] = useState<
    'IDLE' | 'TYPING' | 'LOADING' | 'RESULT' | 'EMPTY'
  >('IDLE')
  const debouncedQuery = useDebounce(query, 300)
  const [tab, setTab] = useState<Tab>('ALL')
  const { recentSearches, addRecent, removeRecent, clearRecent } =
    useSpecialtySearchStore()

  const { data: { data: { suggestions } } = { data: { suggestions: [] } } } =
    useGetSuggestionQuery({
      params: {
        keyword: debouncedQuery,
        specialtyId: specialtyId,
      },
      enabled: debouncedQuery.length > 2,
      placeholderData: keepPreviousData,
    })

  const {
    data: { data: searchData } = {
      data: { hospitals: [], doctors: [], packages: [] },
    },
  } = useGetSearchQuery({
    params: {
      keyword: searchKeyword ?? '',
      type: 'ALL',
      specialtyId: Number(specialtyId),
    },
    enabled: searchKeyword !== null && searchKeyword.trim().length > 2,
    onSuccess: ({ data }) => {
      if (
        data.hospitals.length > 0 ||
        data.doctors.length > 0 ||
        data.packages.length > 0
      ) {
        setStatus('RESULT')
      } else {
        setStatus('EMPTY')
      }
    },
  })

  const searchResults = {
    hospitals: searchData.hospitals,
    doctors: searchData.doctors,
    packages: searchData.packages,
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    setSearchKeyword(null)

    if (!value.trim()) {
      setStatus('IDLE')
    } else {
      setStatus('TYPING')
    }
  }

  const handleSelect = (text: string) => {
    setQuery(text)
    const trimmed = text.trim()
    if (trimmed.length <= 2) {
      setSearchKeyword(null)
      setStatus('EMPTY')
      return
    }

    setSearchKeyword(trimmed)
    setStatus('LOADING')
    addRecent(trimmed)
  }

  const counts = {
    all:
      searchResults.hospitals.length +
      searchResults.doctors.length +
      searchResults.packages.length,
    hospitals: searchResults.hospitals.length,
    doctors: searchResults.doctors.length,
    packages: searchResults.packages.length,
  }

  return (
    <>
      <Header title={specialtyName} />
      <div className="px-[16px] pt-[16px]">
        <SearchBar
          value={query}
          onSearch={handleSearch}
          onClear={() => setQuery('')}
        />
      </div>
      {status === 'IDLE' && (
        <RecentSearches
          onSelect={handleSelect}
          recentSearches={recentSearches}
          onRemove={removeRecent}
          onClear={clearRecent}
        />
      )}
      {status === 'TYPING' && (
        <Suggestions
          query={query}
          items={suggestions}
          onSelect={handleSelect}
        />
      )}
      {status === 'LOADING' && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="w-4 h-4" />
        </div>
      )}
      {status === 'RESULT' && (
        <>
          <SearchTabs
            value={tab}
            onChange={setTab}
            variant="round"
            counts={counts}
          />
          <SearchResults data={searchResults} tab={tab} />
        </>
      )}
      {status === 'EMPTY' && (
        <>
          <SearchTabs value={tab} onChange={setTab} />
          <EmptyState>
            No results for <span className="italic">&quot;{query}&quot;</span>
          </EmptyState>
        </>
      )}
    </>
  )
}
