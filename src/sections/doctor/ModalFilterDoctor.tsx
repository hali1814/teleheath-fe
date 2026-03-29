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
import { useEffect, useMemo, useState } from 'react'

const emptyFilter = (): FilterDoctor => ({
  country: '',
  specialty: '',
  gender: '',
  experienceYears: '',
  consultationType: '',
  priceRange: '',
})

const PRICE_OPTIONS = [
  { label: 'Under 100$', value: '0-100' },
  { label: '100 - 300$', value: '100-300' },
  { label: '300 - 500$', value: '300-500' },
  { label: 'Above 500$', value: '500' },
]

export default function ModalFilterDoctor({
  open,
  onOpenChange,
  appliedFilter,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  appliedFilter: FilterDoctor
  onApply: (filter: FilterDoctor) => void
}) {
  const { t, i18n } = useTranslation(['doctor', 'common'])
  const [draft, setDraft] = useState<FilterDoctor>(appliedFilter)

  useEffect(() => {
    if (open) setDraft({ ...appliedFilter })
  }, [open, appliedFilter])

  const { data: countryList } = useGetCountryListQuery({
    params: {},
  })

  const { data: { data: specialtiesData = [] } = { data: [] } } =
    useGetListSpecialtyQuery({
      params: {},
      enabled: open,
    })

  const handleClearDraft = () => {
    setDraft(emptyFilter())
  }

  const handleApply = () => {
    onApply(draft)
    onOpenChange(false)
  }

  const draftIsEmpty =
    !draft.country &&
    !draft.specialty &&
    !draft.gender &&
    !draft.experienceYears &&
    !draft.consultationType &&
    !draft.priceRange

  const specialtyOptions = useMemo(() => {
    return specialtiesData.map((specialty) => ({
      label: specialty.name,
      value: specialty.id.toString(),
    }))
  }, [specialtiesData])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="no-scrollbar max-h-[80vh] gap-[20px] overflow-y-auto bg-white px-[20px] py-[24px]"
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="hidden">
              <DialogTitle />
            </div>
            <Text size="lg_16" className="font-semibold leading-[1.2]">
              {t('filter.title')}
            </Text>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full text-[#B3B3B3] transition-colors hover:bg-muted"
              onClick={() => onOpenChange(false)}
              aria-label={t('common:actions.close', { defaultValue: 'Close' })}
            >
              <Icon
                name="close"
                className="h-[14px] w-[14px]"
                color="#B3B3B3"
              />
            </button>
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
              value={draft.country}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, country: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.specialty')}</Text>
            <InputSelect
              placeholder={t('filter.specialty')}
              options={specialtyOptions}
              value={draft.specialty}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, specialty: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.gender')}</Text>
            <InputSelect
              placeholder={t('filter.gender')}
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              value={draft.gender}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, gender: value }))
              }
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
              value={draft.experienceYears}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, experienceYears: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.consultationType')}</Text>
            <InputSelect
              placeholder={t('filter.consultationType')}
              options={[
                { label: 'In-person', value: 'IN_PERSON' },
                { label: 'Online consultation', value: 'ONLINE' },
              ]}
              value={draft.consultationType}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, consultationType: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.priceRange')}</Text>
            <InputSelect
              placeholder={t('filter.priceRange')}
              options={PRICE_OPTIONS}
              value={draft.priceRange}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, priceRange: value }))
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-[8px] pt-[10px]">
          <Button
            type="button"
            variant="ghost"
            className="p-0"
            onClick={handleClearDraft}
            disabled={draftIsEmpty}
          >
            <Text className="font-medium leading-normal text-[#A8071A]">
              {t('common:actions.clearAllFilters')}
            </Text>
          </Button>
          <Button
            type="button"
            className="h-[45px] rounded-[40px] px-[32px] py-[12px]"
            onClick={handleApply}
          >
            <Text className="font-medium leading-normal text-white">
              {t('common:actions.apply')}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
