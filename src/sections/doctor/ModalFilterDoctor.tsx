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
import type { FilterDoctor } from '#/routes/app/doctor/(commonLayout)'
import { useGetCountryListQuery } from '#/services/query/country/country-list'
import { type AppLanguage } from '#/i18n'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { ALL_PAGINATION } from '#/const/pagination'

export default function ModalFilterDoctor({
  open,
  onOpenChange,
  filter,
  setFilter,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  filter: FilterDoctor
  setFilter: (filter: FilterDoctor) => void
}) {
  const { t, i18n } = useTranslation(['doctor', 'common'])

  const { data: countryList } = useGetCountryListQuery({
    params: {},
  })

  const {
    data: { data: { content: specialties } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListSpecialtyQuery({
    params: ALL_PAGINATION,
  })

  const handleClearAllFilters = () => {
    setFilter({
      country: '',
      specialty: '',
      gender: '',
      experienceYears: '',
      consultationType: '',
      priceRange: '',
    })
  }

  const handleApplyFilters = () => {
    console.log(filter)
  }

  const isDisabled =
    !filter.country &&
    !filter.specialty &&
    !filter.gender &&
    !filter.experienceYears &&
    !filter.consultationType &&
    !filter.priceRange

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="gap-[20px] px-[20px] py-[24px] bg-white max-h-[80vh] overflow-y-auto no-scrollbar"
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
              value={filter.country}
              onValueChange={(value) =>
                setFilter({ ...filter, country: value })
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.specialty')}</Text>
            <InputSelect
              placeholder={t('filter.specialty')}
              options={specialties.map((specialty) => ({
                label: specialty.name,
                value: specialty.id.toString(),
              }))}
              value={filter.specialty}
              onValueChange={(value) =>
                setFilter({ ...filter, specialty: value })
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.gender')}</Text>
            <InputSelect
              placeholder={t('filter.gender')}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.experienceYears')}</Text>
            <InputSelect
              placeholder={t('filter.experienceYears')}
              options={[
                { label: 'Under 5 years', value: 'under-5' },
                { label: '5 - 10 years', value: '5-10' },
                { label: '10 - 15 years', value: '10-15' },
                { label: 'Over 20 years', value: 'over-20' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.consultationType')}</Text>
            <InputSelect
              placeholder={t('filter.consultationType')}
              options={[
                { label: 'In-person', value: 'in-person' },
                { label: 'Online consultation', value: 'online' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.priceRange')}</Text>
            <InputSelect
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
            onClick={handleApplyFilters}
            disabled={isDisabled}
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
