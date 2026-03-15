import CountryTab from '#/components/CountryTab'
import MenuItem from '#/components/MenuItem'
import PremiumService from '#/components/PremiumService'
import { createFileRoute } from '@tanstack/react-router'
import { hospitals, packages, doctors } from '#/mockData'
import SearchBar from '#/components/SearchBar'
import { HospitalCard, HospitalList } from '#/sections/hospital'
import { PackageCard, PackageList } from '#/sections/package'
import { DoctorCard, DoctorLists } from '#/sections/doctor'
import BottomNavigation from '#/components/BottomNavigation'

export const Route = createFileRoute('/app/component/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px] pb-[100px]">
      <MenuItem icon="call_doctor" title="Call Doctor" variant="outline" />
      <SearchBar />
      <PremiumService />
      <CountryTab />
      <HospitalCard {...hospitals[0]} />
      <HospitalList
        title="Hospitals"
        href="/app/hospitals"
        hospitals={hospitals}
      />
      <PackageCard {...packages[0]} />
      <PackageList title="Packages" href="/app/packages" packages={packages} />
      <DoctorCard {...doctors[0]} />
      <DoctorLists title="Doctors" href="/app/doctors" doctors={doctors} />
      <BottomNavigation />
    </div>
  )
}
