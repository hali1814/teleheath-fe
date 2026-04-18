import SearchBar from '#/components/SearchBar'
import {
  FEATURED_DOCTOR_PAGINATION,
  SPECIALIZED_PACKAGE_PAGINATION,
} from '#/const/pagination'
import { DoctorLists } from '#/sections/doctor'
import { HospitalList } from '#/sections/hospital'
import { PackageList } from '#/sections/package'
import { useGetListPackagesQuery } from '#/services/query/package/list-packages'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useGetListDoctorQuery } from '#/services/query/doctor/list-doctor'
import CountryTab from '#/components/CountryTab'
import {
  HomeHorizontalSectionSkeleton,
  HomeSpecialtyGridSkeleton,
} from '#/sections/home/HomePageSkeleton'
import SliderBanner from '#/sections/home/SliderBanner'
import { useGetTopHospitalsQuery } from '#/services/query/hospital/top-hospitals'
import ListSpecialty from '#/sections/specialty/ListSpecialty'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { useAppStore } from '#/stores/app'
import { NotificationBell } from '#/sections/home'

export const Route = createFileRoute('/app/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['home', 'common'])
  const viewAllLabel = t('common:actions.viewAll')
  const router = useRouter()
  const { activeCountry } = useAppStore()

  const { data, isPending: hospitalsPending } = useGetTopHospitalsQuery({
    params: {
      country: activeCountry,
      size: 5,
    },
  })
  const topHospitalsData = data?.data || []

  const { data: specialtiesDataResponse, isPending: specialtiesPending } =
    useGetListSpecialtyQuery({
      params: {
        country: activeCountry,
        isHome: true,
        size: 6,
      },
    })
  const specialtiesData = specialtiesDataResponse?.data || []

  const {
    isPending: packagesPending,
    data: { data: { content: packagesData } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListPackagesQuery({
    params: {
      country: activeCountry,
      isHome: true,
      homeSize: 5,
    },
  })

  const {
    isPending: doctorsPending,
    data: { data: { content: doctorsData } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListDoctorQuery({
    params: {
      country: activeCountry,
      isHome: true,
      homeSize: 5,
    },
  })

  return (
    <>
      <div className="flex flex-col gap-[20px] px-[16px]">
        <div className="flex items-center gap-[16px]">
          <div className="min-w-0 flex-1">
            <SearchBar
              isHome
              placeholder={t('searchPlaceholder')}
              isAutoScroll={true}
              onClick={() => router.navigate({ to: '/app/search' })}
            />
          </div>
          <NotificationBell />
        </div>
        {/* <MenuList /> */}
        <SliderBanner />
        {/* <PremiumService /> */}
        <CountryTab />
      </div>
      <div
        className="flex flex-col gap-[20px] mb-[120px]"
        aria-busy={
          hospitalsPending ||
          specialtiesPending ||
          packagesPending ||
          doctorsPending
        }
      >
        {hospitalsPending && (
          <HomeHorizontalSectionSkeleton
            title={t('topHospitals')}
            viewAllHref="/app/hospital"
            viewAllLabel={viewAllLabel}
          />
        )}
        {!hospitalsPending && topHospitalsData.length > 0 && (
          <HospitalList
            title={t('topHospitals')}
            href="/app/hospital"
            hospitals={topHospitalsData}
          />
        )}
        {specialtiesPending && (
          <HomeSpecialtyGridSkeleton
            title={t('specialties')}
            viewAllHref="/app/specialty"
            viewAllLabel={viewAllLabel}
          />
        )}
        {!specialtiesPending && specialtiesData.length > 0 && (
          <ListSpecialty
            title={t('specialties')}
            href="/app/specialty"
            specialties={specialtiesData}
          />
        )}
        {packagesPending && (
          <HomeHorizontalSectionSkeleton
            title={t('specializedPackages')}
            viewAllHref="/app/package"
            viewAllLabel={viewAllLabel}
          />
        )}
        {!packagesPending && packagesData.length > 0 && (
          <PackageList
            title={t('specializedPackages')}
            href="/app/package"
            packages={packagesData}
          />
        )}
        {doctorsPending && (
          <HomeHorizontalSectionSkeleton
            title={t('featuredDoctors')}
            viewAllHref="/app/doctor"
            viewAllLabel={viewAllLabel}
          />
        )}
        {!doctorsPending && doctorsData.length > 0 && (
          <DoctorLists
            title={t('featuredDoctors')}
            href="/app/doctor"
            doctors={doctorsData}
          />
        )}
      </div>
    </>
  )
}
