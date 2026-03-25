import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import InputSelect from '#/components/input/InputSelect'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import type { FilterPackage } from '#/routes/app/package/(commonLayout)'
import { useGetCountryListQuery } from '#/services/query/country/country-list'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { type AppLanguage } from '#/i18n'

export default function ModalFilterPackage({
  open,
  onOpenChange,
  filter,
  setFilter,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  filter: FilterPackage
  setFilter: (filter: FilterPackage) => void
}) {
  const { t, i18n } = useTranslation(['package', 'common'])

  const { data: countryList } = useGetCountryListQuery({
    params: {},
  })

  const handleClearAllFilters = () => {
    setFilter({ country: '', hospital: '', price: '' })
  }

  const handleApplyFilters = () => {
    console.log(filter)
  }

  const isDisabled = !filter.country && !filter.hospital && !filter.price

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="gap-[20px] px-[20px] py-[24px] bg-white"
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="hidden">
              <DialogTitle></DialogTitle>
            </div>
            <Text size="lg_16" className="font-semibold leading-[1.2]">
              {t('filter.title')}
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px]"
              color="#B3B3B3"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.country')}</Text>
            <InputSelect
              value={filter.country}
              onValueChange={(value) =>
                setFilter({ ...filter, country: value })
              }
              placeholder={t('filter.country')}
              options={
                countryList?.data.map((country) => ({
                  label: getLocalizedTextByLang(
                    country.nameVi,
                    null,
                    country.nameEn,
                    i18n.language as AppLanguage,
                  ),
                  value: country.code,
                })) ?? []
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.hospital')}</Text>
            <InputSelect
              value={filter.hospital}
              onValueChange={(value) =>
                setFilter({ ...filter, hospital: value })
              }
              placeholder={t('filter.hospital')}
              options={[
                { label: 'Hospital 1', value: 'hospital-1' },
                { label: 'Hospital 2', value: 'hospital-2' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.priceRange')}</Text>
            <InputSelect
              value={filter.price}
              onValueChange={(value) => setFilter({ ...filter, price: value })}
              placeholder={t('filter.priceRange')}
              options={[
                { label: 'Under 100$', value: '0-100' },
                { label: '100 - 300$', value: '100-300' },
                { label: '300 - 500$', value: '300-500' },
                { label: 'Above 500$', value: '500' },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-[8px] pt-[10px]">
          <Button
            variant="ghost"
            className="p-0"
            onClick={handleClearAllFilters}
            disabled={isDisabled}
          >
            <Text className="text-[#A8071A] leading-normal font-medium">
              {t('common:actions.clearAllFilters')}
            </Text>
          </Button>
          <Button
            className="h-[45px] px-[32px] py-[12px] rounded-[40px]"
            disabled={isDisabled}
            onClick={handleApplyFilters}
          >
            <Text className="leading-normal font-medium text-white">
              {t('common:actions.apply')}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
