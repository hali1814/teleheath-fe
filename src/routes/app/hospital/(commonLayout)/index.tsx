import SearchBar from '#/components/SearchBar'
import { createFileRoute } from '@tanstack/react-router'
import CountryList from '#/sections/country/CountryList'
import { HospitalCard } from '#/sections/hospital'
import { useTranslation } from 'react-i18next'
import { useGetListHospitalsQuery } from '#/services/query/hospital/list-hospitals'
import { useState } from 'react'
import useDebounce from '#/hooks/use-debounce'

export const Route = createFileRoute('/app/hospital/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['hospital', 'common'])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const { data: { data: hospitalsData } = { data: [] } } =
    useGetListHospitalsQuery({
      params: {
        page: 1,
        size: 5,
        name: debouncedQuery,
      },
    })

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <SearchBar
        placeholder={t('searchPlaceholder')}
        value={query}
        onSearch={(value) => setQuery(value)}
        onClear={() => setQuery('')}
      />
      <CountryList />
      {hospitalsData.map((hospital) => (
        <HospitalCard
          key={hospital.hospitalId}
          id={hospital.hospitalId}
          name={hospital.nameVi}
          location={hospital.address}
          thumbnail={hospital.thumbnailUrl}
          size="md"
          variantButton="solid"
          showBadge={true}
        />
      ))}
    </div>
  )
}
