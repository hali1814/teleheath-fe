import SearchBar from '#/components/SearchBar'
import {
  ALL_SPECIALTY_PAGINATION,
  FEATURED_DOCTOR_PAGINATION,
  SPECIALIZED_PACKAGE_PAGINATION,
  TOP_HOSPITAL_PAGINATION,
} from '#/const/pagination'
import { DoctorLists } from '#/sections/doctor'
import { HospitalList } from '#/sections/hospital'
import { PackageList } from '#/sections/package'
import { useGetProfileQuery } from '#/services/query/profile/getProfile'
import { useProfileStore } from '#/stores/profile'
import { useGetListPackagesQuery } from '#/services/query/package/list-packages'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useGetListDoctorQuery } from '#/services/query/doctor/list-doctor'
import CountryTab from '#/components/CountryTab'
import { useState } from 'react'
import SliderBanner from '#/sections/home/SliderBanner'
import { useGetTopHospitalsQuery } from '#/services/query/hospital/top-hospitals'
import ListSpecialty from '#/sections/specialty/ListSpecialty'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { useAppStore } from '#/stores/app'

export const Route = createFileRoute('/app/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['home', 'common'])
  const router = useRouter()
  const { activeCountry, setActiveCountry } = useAppStore()

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

  const { data } = useGetTopHospitalsQuery({
    params: {},
  })
  const topHospitalsData = data?.data || []

  const { data: specialtiesDataResponse } = useGetListSpecialtyQuery({
    params: {
      country: activeCountry,
    },
  })
  const specialtiesData = specialtiesDataResponse?.data || []

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
    params: {
      ...FEATURED_DOCTOR_PAGINATION,
      topOnly: true,
    },
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
        <SliderBanner
          items={[
            {
              id: 1,
              src: '/thumbnail.png',
              alt: 'Image 1',
            },
            {
              id: 2,
              src: '/thumbnail.png',
              alt: 'Image 2',
            },
          ]}
        />
        {/* <PremiumService /> */}
        <CountryTab />
      </div>
      <div className="flex flex-col gap-[20px] mb-[120px]">
        {topHospitalsData.length > 0 && (
          <HospitalList
            title={t('topHospitals')}
            href="/app/hospital"
            hospitals={topHospitalsData}
          />
        )}
        {specialtiesData.length > 0 && (
          <ListSpecialty
            title={t('specialties')}
            href="/app/specialty"
            specialties={specialtiesData}
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
