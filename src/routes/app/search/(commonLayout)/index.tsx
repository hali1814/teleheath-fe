import { createFileRoute } from '@tanstack/react-router'
import {
  EmptyState,
  RecentSearches,
  SearchInput,
  SearchResults,
  SearchTabs,
  Suggestions,
  TransNoResultsFor,
} from '#/sections/search'
import { keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { useGetSuggestionQuery } from '#/services/query/search/suggestion'
import { useGetSearchQuery } from '#/services/query/search/search'
import { useSearchStore } from '#/stores/search'
import LoadingState from '#/components/LoadingState'
import PullToRefresh from '#/components/PullToRefresh'

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
  const { recentSearches, addRecent, removeRecent, clearRecent } =
    useSearchStore()

  const {
    data: { data: { suggestions } } = { data: { suggestions: [] } },
    refetch: refetchSuggestions,
  } = useGetSuggestionQuery({
    params: {
      keyword: debouncedQuery,
    },
    enabled: debouncedQuery.length > 0,
    placeholderData: keepPreviousData,
  })

  const {
    data: { data: searchData } = {
      data: { hospitals: [], doctors: [], packages: [] },
    },
    refetch: refetchSearch,
  } = useGetSearchQuery({
    params: {
      keyword: searchKeyword ?? '',
      type: 'ALL',
    },
    enabled: searchKeyword !== null && searchKeyword.trim().length > 0,
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
    if (trimmed.length <= 0) {
      setSearchKeyword(null)
      setStatus('EMPTY')
      return
    }

    setSearchKeyword(trimmed)
    setStatus('LOADING')
    addRecent(trimmed)
  }

  const handleSubmitSearch = () => {
    handleSelect(query)
  }

  const handleRefresh = async () => {
    await Promise.all([refetchSuggestions(), refetchSearch()])
  }

  return (
    <>
      <SearchInput
        value={query}
        onSearch={handleSearch}
        onSubmit={handleSubmitSearch}
      />
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
      {status === 'LOADING' && <LoadingState />}
      {status === 'RESULT' && (
        <>
          <PullToRefresh onRefresh={handleRefresh}>
            <SearchTabs value={tab} onChange={setTab} />
            <SearchResults data={searchResults} tab={tab} query={query} />
          </PullToRefresh>
        </>
      )}
      {status === 'EMPTY' && (
        <>
          <SearchTabs value={tab} onChange={setTab} />
          <EmptyState>
            <TransNoResultsFor query={query} />
          </EmptyState>
        </>
      )}
    </>
  )
}
