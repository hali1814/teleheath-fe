import CountryTab from '#/components/CountryTab'
import MenuItem from '#/components/MenuItem'
// import PremiumService from '#/components/PremiumService'
import { createFileRoute } from '@tanstack/react-router'
import { hospitals, packages, doctors } from '#/mockData'
import SearchBar from '#/components/SearchBar'
import { HospitalCard, HospitalList } from '#/sections/hospital'
import { PackageCard, PackageList } from '#/sections/package'
import { DoctorCard, DoctorLists } from '#/sections/doctor'
import BottomNavigation from '#/components/BottomNavigation'
import Header from '#/sections/home/Header'
import Avatar from '#/sections/profile/Avatar'
import CardNavigate from '#/sections/common/CardNavigate'
import NotificationCard from '#/sections/notification/NotificationCard'

export const Route = createFileRoute('/app/component/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px] pb-[100px]">
      <Header isHome={false} title="Component" />
      <Header isHome />
      <MenuItem icon="call_doctor" title="Call Doctor" variant="outline" />
      <SearchBar />
      {/* <PremiumService /> */}
      <CountryTab
        tabs={[
          {
            value: 'vietnam',
            label: 'Vietnam',
            content: (
              <>
                <HospitalCard {...hospitals[0]} />
                <HospitalCard
                  {...hospitals[0]}
                  showBadge={true}
                  size="md"
                  variantButton="solid"
                />
                <HospitalList
                  title="Hospitals"
                  href="/app/hospitals"
                  hospitals={hospitals}
                />
                <PackageCard {...packages[0]} />
                <PackageList
                  title="Packages"
                  href="/app/packages"
                  packages={packages}
                />
                <DoctorCard {...doctors[0]} />
                <DoctorLists
                  title="Doctors"
                  href="/app/doctors"
                  doctors={doctors}
                />
              </>
            ),
          },
          { value: 'cambodia', label: 'Cambodia', disabled: true },
        ]}
      />
      <BottomNavigation />
      <Avatar initials="SC" onCameraClick={() => {}} />
      <NotificationCard />
      <CardNavigate title="Language" icon="language" onClick={() => {}} />
    </div>
  )
}
