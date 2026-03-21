import CountryTab from '#/components/CountryTab'
import SearchBar from '#/components/SearchBar'
import { doctors, hospitals, packages } from '#/mockData'
import { DoctorLists } from '#/sections/doctor'
import { MenuList, PremiumService } from '#/sections/home'
import { HospitalList } from '#/sections/hospital'
import { PackageList } from '#/sections/package'
import { useGetListHospitalsQuery } from '#/services/query/hospital/list-hospitals'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['home', 'common'])
  const router = useRouter()

  const { data: hospitalsData } = useGetListHospitalsQuery({
    params: {
      page: 1,
      pageSize: 10,
    },
  })

  console.log(hospitalsData)

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
