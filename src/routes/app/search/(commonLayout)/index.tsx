import { createFileRoute } from '@tanstack/react-router'
import {
  EmptyState,
  RecentSearches,
  SearchInput,
  SearchResults,
  SearchTabs,
  Suggestions,
} from '#/sections/search'
import { useEffect, useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { Spinner } from '#/components/ui/spinner'
import { hospitals, doctors, packages } from '#/mockData'

export const Route = createFileRoute('/app/search/(commonLayout)/')({
  component: RouteComponent,
})

const suggestionItems = [
  {
    text: 'Cardiologist',
  },
  {
    text: 'Cardiology Center Hospital',
  },
]

const mockResult = {
  hospitals: hospitals.slice(0, 3),
  doctors: doctors.slice(0, 3),
  packages: packages.slice(0, 3),
}

export type Tab = 'ALL' | 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

function RouteComponent() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<
    'IDLE' | 'TYPING' | 'LOADING' | 'RESULT' | 'EMPTY'
  >('IDLE')
  const debouncedQuery = useDebounce(query, 300)
  const [tab, setTab] = useState<Tab>('ALL')

  const handleSearch = (value: string) => {
    setQuery(value)

    if (!value.trim()) {
      setStatus('IDLE')
    } else {
      setStatus('TYPING')
    }
  }

  const handleSelect = (text: string) => {
    setQuery(text)
    setStatus('LOADING')

    setTimeout(() => {
      const hasResult = debouncedQuery.length > 2

      if (hasResult) {
        setStatus('RESULT')
      } else {
        setStatus('EMPTY')
      }
    }, 500)
  }

  useEffect(() => {
    if (!debouncedQuery) return
    if (status === 'RESULT' || status === 'EMPTY' || status === 'LOADING')
      return

    setTimeout(() => {
      setStatus('TYPING')
    }, 300)
  }, [debouncedQuery])

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      {status === 'IDLE' && <RecentSearches />}
      {status === 'TYPING' && (
        <Suggestions
          query={query}
          items={suggestionItems}
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
          <SearchResults data={mockResult} tab={tab} />
        </>
      )}
      {status === 'EMPTY' && (
        <>
          <SearchTabs value={tab} onChange={setTab} />
          <EmptyState query={query} />
        </>
      )}
    </>
  )
}
