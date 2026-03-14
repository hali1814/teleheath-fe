import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import MenuItem from '#/components/MenuItem'
import SearchBar from '#/components/SearchBar'
import PremiumService from '#/components/PremiumService'
import CountryTab from '#/components/CountryTab'
import HospitalCard from '#/components/HospitalCard'
import HospitalList from '#/components/HospitalList'
import PackageCard from '#/components/PackageCard'
import PackageList from '#/components/PackageList'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { t } = useTranslation(['home', 'profile', 'common', 'haohoa'])

  return (
    <main className="flex flex-col gap-4 min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 ">
      <section className="island-shell rise-in w-full max-w-xl rounded-[2rem] p-[16px] text-center sm:p-10 bg bg-[#F8F6F6]">
        <p className="island-kicker mb-3">{t('home:kicker')}</p>
        <h1 className="display-title mb-4 text-4xl font-bold text-(--sea-ink) sm:text-5xl">
          {t('home:title')}
        </h1>
        <p className="text-haohoa mx-auto mb-8 max-w-md text-sm leading-7 sm:text-base">
          {t('haohoa:title')}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className="mt-8 rounded-2xl border border-(--chip-line) bg-(--chip-bg) p-4 text-left">
          <h2 className="mb-2 text-lg font-semibold text-(--sea-ink)">
            {t('profile:title')}
          </h2>
          <p className="mb-4 text-sm leading-6 text-(--sea-ink-soft)">
            {t('profile:description')}
          </p>
          <div className="grid gap-2 text-sm text-(--sea-ink)">
            <p className="text-3xl">{t('common:field.firstName')}: Hao</p>
            <p>{t('common:field.lastName')}: Nguyen</p>
            <p>{t('common:field.phone')}: 012 345 678</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold leading-[30px]">
          Complete Care Journey
        </h2>

        <p className="text-sm ">Book Appointments</p>
      </section>
      <MenuItem
        icon="/icons/call-doctor.png"
        title="Services"
        variant="outline"
      />
      <MenuItem icon="/icons/medical_services.png" title="Services" />
      <SearchBar />
      <PremiumService />
      <CountryTab />
      <HospitalCard
        name="Vinmec International Hospital"
        location="Ho Chi Minh City, Vietnam"
        thumbnail="/thumbnail.png"
      />
      <HospitalList />
      <PackageCard
        className="w-[192px]"
        name="Package Name"
        location="Location"
        price={170.0}
        thumbnail="/thumbnail.png"
      />
      <PackageList />
    </main>
  )
}
