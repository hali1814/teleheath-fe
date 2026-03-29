import SearchBar from '#/components/SearchBar'
import { Spinner } from '#/components/ui/spinner'
import useDebounce from '#/hooks/use-debounce'
import { Header } from '#/sections/home'
import { SearchTabs, SearchResults, EmptyState } from '#/sections/search'
import { useGetSearchQuery } from '#/services/query/search/search'
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
  const debouncedQuery = useDebounce(query, 300)
  const searchKeyword = debouncedQuery.trim()
  const [tab, setTab] = useState<Tab>('ALL')

  const {
    isLoading,
    isFetching,
    data: { data: searchData } = {
      data: { hospitals: [], doctors: [], packages: [] },
    },
  } = useGetSearchQuery({
    params: {
      keyword: searchKeyword ?? '',
      type: 'ALL',
      specialtyId: Number(specialtyId),
    },
    enabled: Number.isFinite(Number(specialtyId)),
  })

  const searchResults = {
    hospitals: searchData.hospitals,
    doctors: searchData.doctors,
    packages: searchData.packages,
  }

  const handleSearch = (value: string) => {
    setQuery(value)
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
      {(isLoading || isFetching) && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="w-4 h-4" />
        </div>
      )}
      {!isLoading && !isFetching && counts.all > 0 && (
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
      {!isLoading && !isFetching && counts.all === 0 && (
        <>
          <SearchTabs
            value={tab}
            onChange={setTab}
            variant="round"
            counts={counts}
          />
          <EmptyState>
            {searchKeyword ? (
              <>
                No results for{' '}
                <span className="italic">&quot;{searchKeyword}&quot;</span>
              </>
            ) : (
              'No data available'
            )}
          </EmptyState>
        </>
      )}
    </>
  )
}
