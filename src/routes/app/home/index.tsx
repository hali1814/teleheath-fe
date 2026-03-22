import CountryTab from '#/components/CountryTab'
import SearchBar from '#/components/SearchBar'
import { doctors, hospitals, packages } from '#/mockData'
import { DoctorLists } from '#/sections/doctor'
import { MenuList, PremiumService } from '#/sections/home'
import { HospitalList } from '#/sections/hospital'
import { PackageList } from '#/sections/package'
import { useGetProfileQuery } from '#/services/query/profile/getProfile'
import { useProfileStore } from '#/stores/profile'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['home', 'common'])
  const router = useRouter()

  useGetProfileQuery({
    params: {},
    onSuccess: (data) => {
      if (data.success) {
        console.log(data.data)
        useProfileStore.getState().setProfile(data.data)
      }
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
  })

  return (
    <>
      <SearchBar
        placeholder={t('searchPlaceholder')}
        onClick={() => router.navigate({ to: '/app/search' })}
      />
      <MenuList />
      <PremiumService />
      <CountryTab
        tabs={[
          {
            value: 'vietnam',
            label: t('common:countries.vietnam'),
            content: (
              <div className="flex flex-col gap-[20px] mb-[100px]">
                <HospitalList
                  title={t('topHospitals')}
                  href="/app/hospital"
                  hospitals={hospitals}
                />
                <PackageList
                  title={t('specializedPackages')}
                  href="/app/package"
                  packages={packages}
                />
                <DoctorLists
                  title={t('featuredDoctors')}
                  href="/app/doctor"
                  doctors={doctors}
                />
              </div>
            ),
          },
          {
            value: 'cambodia',
            label: t('common:countries.cambodia'),
            disabled: true,
          },
        ]}
      />
    </>
  )
}
