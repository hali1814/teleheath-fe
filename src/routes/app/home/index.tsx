import CountryTab from '#/components/CountryTab'
import PremiumService from '#/components/PremiumService'
import SearchBar from '#/components/SearchBar'
import { doctors, hospitals, packages } from '#/mockData'
import { DoctorLists } from '#/sections/doctor'
import { HospitalList } from '#/sections/hospital'
import { PackageList } from '#/sections/package'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SearchBar placeholder="Search for doctors, hospitals, packages" />
      <PremiumService />
      <CountryTab
        tabs={[
          {
            value: 'vietnam',
            label: 'Vietnam',
            content: (
              <div className="flex flex-col gap-[20px] mb-[100px]">
                <HospitalList
                  title="Top Hospitals"
                  href="/app/hospital"
                  hospitals={hospitals}
                />
                <PackageList
                  title="Specialized Packages"
                  href="/app/package"
                  packages={packages}
                />
                <DoctorLists
                  title="Featured Doctors"
                  href="/app/doctor"
                  doctors={doctors}
                />
              </div>
            ),
          },
          { value: 'cambodia', label: 'Cambodia', disabled: true },
        ]}
      />
    </>
  )
}
