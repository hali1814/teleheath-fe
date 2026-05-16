import SearchBar from '#/components/SearchBar'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import CountryList from '#/sections/country/CountryList'
import { HospitalCard } from '#/sections/hospital'
import { useTranslation } from 'react-i18next'
import { useGetListHospitalsInfiniteQuery } from '#/services/query/hospital/list-hospitals'
import { useMemo, useRef, useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { useInfiniteScroll } from '#/hooks/use-infinite-scroll'
import { Header } from '#/sections/home'
import { z } from 'zod'
import { EmptyState } from '#/sections/search'
import PullToRefresh from '#/components/PullToRefresh'
import LoadingState from '#/components/LoadingState'

const optionalTrim = (s: string | undefined) => s?.trim() || undefined

const hospitalSearchSchema = z
  .object({
    country: z.string().optional(),
  })
  .transform((s) => {
    const c = optionalTrim(s.country)
    const country = c === 'VN' || c === 'KH' ? c : undefined
    return { country }
  })

export type HospitalSearch = z.infer<typeof hospitalSearchSchema>

function activeCountryFromSearch(
  country: HospitalSearch['country'],
): 'VN' | 'KH' | 'all' {
  if (country === 'VN' || country === 'KH') return country
  return 'all'
}

export const Route = createFileRoute('/app/hospital/(commonLayout)/')({
  validateSearch: (search: Record<string, unknown>): HospitalSearch =>
    hospitalSearchSchema.parse(search ?? {}),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['hospital', 'common', 'search'])
  const navigate = useNavigate()
  const search = Route.useSearch()

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const activeCountry = activeCountryFromSearch(search.country)

  const setCountry = (country: 'VN' | 'KH' | 'all') => {
    navigate({
      to: '/app/hospital',
      search: (prev) => ({
        ...prev,
        country: country === 'all' ? undefined : country,
      }),
      replace: true,
    })
  }

  const {
    data: hospitalsResponse,
    refetch,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetListHospitalsInfiniteQuery({
    params: {
      size: 10,
      keyword: debouncedQuery,
      hasRoomAvailable: true,
      ...(search.country ? { country: search.country } : {}),
    },
  })

  const hospitalsData = useMemo(
    () =>
      hospitalsResponse?.pages.flatMap(
        (page) => page?.data?.content ?? [],
      ) ?? [],
    [hospitalsResponse?.pages],
  )

  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    targetRef: loaderRef,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={t('hospital:title')} />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[35px]">
        <SearchBar
          placeholder={t('searchPlaceholder')}
          value={query}
          onSearch={(value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        <CountryList activeCountry={activeCountry} onClick={setCountry} />
        {isPending ? (
          <LoadingState />
        ) : hospitalsData.length > 0 ? (
          <>
            {hospitalsData.map((hospital) => (
              <HospitalCard
                key={hospital.hospitalId}
                size="md"
                variantButton="solid"
                showBadge={true}
                showAddress={true}
                {...hospital}
              />
            ))}
            {hasNextPage ? (
              <div
                ref={loaderRef}
                className="flex items-center justify-center py-4"
              >
                {isFetchingNextPage ? (
                  <span className="size-5 animate-spin rounded-full border-2 border-[#FFE8E6] border-t-[#A8071A]" />
                ) : null}
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState>{t('search:empty.hospitals')}</EmptyState>
        )}
      </div>
    </PullToRefresh>
  )
}
