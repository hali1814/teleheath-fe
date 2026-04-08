import LoadingState from '#/components/LoadingState'
import SearchBar from '#/components/SearchBar'
import useDebounce from '#/hooks/use-debounce'
import { Header } from '#/sections/home'
import {
  SearchTabs,
  SearchResults,
  EmptyState,
  TransNoResultsFor,
} from '#/sections/search'
import { useGetSearchSpecialtyQuery } from '#/services/query/search/search-specialty'
import { filterSpecialtySearchByKeyword } from '#/utils/specialty-search-filter.util'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation(['search', 'common'])
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
  } = useGetSearchSpecialtyQuery({
    params: {
      specialtyId: Number(specialtyId),
    },
    enabled: Number.isFinite(Number(specialtyId)),
  })

  const apiBuckets = useMemo(
    () => ({
      hospitals: searchData?.hospitals ?? [],
      doctors: searchData?.doctors ?? [],
      packages: searchData?.packages ?? [],
    }),
    [searchData],
  )

  const rawTotalCount =
    apiBuckets.hospitals.length +
    apiBuckets.doctors.length +
    apiBuckets.packages.length

  /** Filter theo keyword trên FE (API chỉ gọi 1 lần theo specialtyId) */
  const searchResults = useMemo(
    () => filterSpecialtySearchByKeyword(apiBuckets, searchKeyword),
    [apiBuckets, searchKeyword],
  )

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
          placeholder={t('specialtySearchPlaceholder')}
          value={query}
          onSearch={handleSearch}
          onClear={() => setQuery('')}
        />
      </div>
      {(isLoading || isFetching) && <LoadingState />}
      {!isLoading && !isFetching && counts.all > 0 && (
        <>
          <SearchTabs
            value={tab}
            onChange={setTab}
            variant="round"
            counts={counts}
          />
          <SearchResults
            data={searchResults}
            tab={tab}
            query={searchKeyword}
            hideCount
            hideBookAppointment={false}
          />
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
            {rawTotalCount === 0
              ? t('common:noDataAvailable')
              : searchKeyword
                ? (
                    <TransNoResultsFor query={searchKeyword} />
                  )
                : t('common:noDataAvailable')}
          </EmptyState>
        </>
      )}
    </>
  )
}
