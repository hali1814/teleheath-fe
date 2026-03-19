import SearchBar from '#/components/SearchBar'
import { createFileRoute } from '@tanstack/react-router'
import CountryList from '#/sections/country/CountryList'
import { HospitalCard } from '#/sections/hospital'
import { hospitals } from '#/mockData'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/hospital/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <SearchBar placeholder={t('searchPlaceholder')} />
      <CountryList />
      {hospitals.map((hospital) => (
        <HospitalCard
          key={hospital.id}
          {...hospital}
          size="md"
          variantButton="solid"
          showBadge={true}
        />
      ))}
    </div>
  )
}
