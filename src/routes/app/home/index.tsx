import CountryTabOld from '#/components/CountryTabOld'
import SearchBar from '#/components/SearchBar'
import {
  FEATURED_DOCTOR_PAGINATION,
  SPECIALIZED_PACKAGE_PAGINATION,
  TOP_HOSPITAL_PAGINATION,
} from '#/const/pagination'
import { DoctorLists } from '#/sections/doctor'
import { MenuList, PremiumService } from '#/sections/home'
import { HospitalList } from '#/sections/hospital'
import { PackageList } from '#/sections/package'
import { useGetProfileQuery } from '#/services/query/profile/getProfile'
import { useProfileStore } from '#/stores/profile'
import { useGetListHospitalsQuery } from '#/services/query/hospital/list-hospitals'
import { useGetListPackagesQuery } from '#/services/query/package/list-packages'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useGetListDoctorQuery } from '#/services/query/doctor/list-doctor'
import CountryTab from '#/components/CountryTab'
import { useState } from 'react'
import Carousel from '#/components/Carousel'

export const Route = createFileRoute('/app/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['home', 'common'])
  const router = useRouter()

  const [activeCountry, setActiveCountry] = useState<string>('vietnam')

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

  const {
    data: { data: { content: hospitalsData } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListHospitalsQuery({
    params: TOP_HOSPITAL_PAGINATION,
  })

  const {
    data: { data: { content: packagesData } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListPackagesQuery({
    params: SPECIALIZED_PACKAGE_PAGINATION,
  })

  const {
    data: { data: { content: doctorsData } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListDoctorQuery({
    params: FEATURED_DOCTOR_PAGINATION,
  })

  return (
    <>
      <div className="flex flex-col gap-[20px] px-[16px]">
        <SearchBar
          isHome
          placeholder={t('searchPlaceholder')}
          isAutoScroll={true}
          onClick={() => router.navigate({ to: '/app/search' })}
        />
        {/* <MenuList /> */}
        {/* <Carousel
          items={[
            {
              id: 1,
              src: 'https://via.placeholder.com/150',
              alt: 'Image 1',
            },
            {
              id: 2,
              src: 'https://via.placeholder.com/150',
              alt: 'Image 2',
            },
          ]}
        /> */}
        <PremiumService />
        <CountryTab
          value={activeCountry}
          onChange={setActiveCountry}
          tabs={[
            {
              value: 'vietnam',
              label: t('common:countries.vietnam'),
            },
            {
              value: 'cambodia',
              label: t('common:countries.cambodia'),
            },
          ]}
        />
      </div>
      <div className="flex flex-col gap-[20px] mb-[120px]">
        {hospitalsData.length > 0 && (
          <HospitalList
            title={t('topHospitals')}
            href="/app/hospital"
            hospitals={hospitalsData}
          />
        )}
        {packagesData.length > 0 && (
          <PackageList
            title={t('specializedPackages')}
            href="/app/package"
            packages={packagesData}
          />
        )}
        {doctorsData.length > 0 && (
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
