import SearchBar from '#/components/SearchBar'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import CountryList from '#/sections/country/CountryList'
import { HospitalCard } from '#/sections/hospital'
import { useTranslation } from 'react-i18next'
import { useGetListHospitalsQuery } from '#/services/query/hospital/list-hospitals'
import { useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { ALL_PAGINATION } from '#/const/pagination'
import { keepPreviousData } from '@tanstack/react-query'
import { Header } from '#/sections/home'
import { z } from 'zod'
import { EmptyState } from '#/sections/search'
import Text from '#/components/text'
import PullToRefresh from '#/components/PullToRefresh'

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
    data: { data: { content: hospitalsData } = { content: [] } } = {
      data: { content: [] },
    },
    refetch,
  } = useGetListHospitalsQuery({
    params: {
      ...ALL_PAGINATION,
      keyword: debouncedQuery,
      hasRoomAvailable: true,
      ...(search.country ? { country: search.country } : {}),
    },
    placeholderData: keepPreviousData,
  })

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <>
      <Header title={t('hospital:title')} />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[35px]">
        <SearchBar
          placeholder={t('searchPlaceholder')}
          value={query}
          onSearch={(value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        <CountryList activeCountry={activeCountry} onClick={setCountry} />
        {hospitalsData.length > 0 ? (
          <>
            <PullToRefresh onRefresh={handleRefresh}>
              <div className="flex flex-col gap-[16px]">
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
              </div>
            </PullToRefresh>
          </>
        ) : (
          <EmptyState>{t('search:empty.hospitals')}</EmptyState>
        )}
      </div>
    </>
  )
}
