import { cn } from '#/lib/utils'
import { HomeCountryTabSkeleton } from '#/sections/home/HomePageSkeleton'
import { useGetCountriesQuery } from '#/services/query/profile/getCountry'
import { useTranslation } from 'react-i18next'
import { Icon } from './icon'
import Text from './text'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'
import { useAppStore } from '#/stores/app'

export default function CountryTab() {
  const { i18n } = useTranslation()
  const { activeCountry, setActiveCountry } = useAppStore()

  const { data: countriesData, isPending } = useGetCountriesQuery({
    params: {},
  })

  const countries =
    countriesData?.data?.sort((a, b) => b.code.localeCompare(a.code)) || []

  if (isPending) {
    return <HomeCountryTabSkeleton />
  }

  return (
    <div
      className="w-full h-[45px] flex items-center justify-between rounded-[30px] bg-secondary/5 px-[4px]"
      style={{
        boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.05) inset',
      }}
    >
      {countries.map((country) => (
        <div
          key={country.code}
          className={cn(
            'h-[37px] flex-1 flex items-center justify-center gap-[6px] rounded-[30px]',
            country.code === activeCountry ? 'bg-white' : '',
          )}
          style={{
            boxShadow:
              country.code === activeCountry
                ? '0px 1px 2px -1px rgba(0, 0, 0, 0.1)'
                : '',
          }}
          onClick={() => setActiveCountry(country.code as 'KH' | 'VN')}
        >
          <Icon name="map_marker" className="w-[14px] h-[14px] text-primary" />
          <Text
            size="base_14"
            className="font-medium leading-normal text-center text-primary"
          >
            {getLocalizedTextByLang(
              country.nameVi,
              country.nameKh,
              country.nameEn,
              i18n.language as AppLanguage,
            )}
          </Text>
        </div>
      ))}
    </div>
  )
}
