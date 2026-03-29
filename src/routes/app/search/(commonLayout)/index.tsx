import { createFileRoute } from '@tanstack/react-router'
import {
  EmptyState,
  RecentSearches,
  SearchInput,
  SearchResults,
  SearchTabs,
  Suggestions,
} from '#/sections/search'
import { keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { Spinner } from '#/components/ui/spinner'
import { useGetSuggestionQuery } from '#/services/query/search/suggestion'
import { useGetSearchQuery } from '#/services/query/search/search'
import { useSearchStore } from '#/stores/search'

export const Route = createFileRoute('/app/search/(commonLayout)/')({
  component: RouteComponent,
})

export type Tab = 'ALL' | 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

function RouteComponent() {
  const [query, setQuery] = useState('')
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null)
  const [status, setStatus] = useState<
    'IDLE' | 'TYPING' | 'LOADING' | 'RESULT' | 'EMPTY'
  >('IDLE')
  const debouncedQuery = useDebounce(query, 300)
  const [tab, setTab] = useState<Tab>('ALL')
  const addRecent = useSearchStore((s) => s.addRecent)

  const { data: { data: { suggestions } } = { data: { suggestions: [] } } } =
    useGetSuggestionQuery({
      params: {
        keyword: debouncedQuery,
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

  return (
    <>
      <SearchInput value={query} onSearch={handleSearch} />
      {status === 'IDLE' && <RecentSearches onSelect={handleSelect} />}
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
          <SearchTabs value={tab} onChange={setTab} />
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
