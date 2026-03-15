import SearchBar from '#/components/SearchBar'
import { createFileRoute } from '@tanstack/react-router'
import CountryList from '#/sections/country/CountryList'
import { HospitalCard } from '#/sections/hospital'
import { hospitals } from '#/mockData'

export const Route = createFileRoute('/app/hospital/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SearchBar placeholder="Search for hospitals" />
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
    </>
  )
}
