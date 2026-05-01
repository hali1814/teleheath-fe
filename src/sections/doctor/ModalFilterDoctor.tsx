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
import { useGetListHospitalsQuery } from '#/services/query/hospital/list-hospitals'
import { useEffect, useMemo, useState } from 'react'
import { ALL_PAGINATION } from '#/const/pagination'
import { getPackagePriceRangeOptions } from '../package/package-filter-price'

const emptyFilter = (): FilterDoctor => ({
  country: '',
  hospitalId: '',
  specialtyId: undefined,
  gender: '',
  experienceYears: '',
  priceRange: '',
})

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
  const { t, i18n } = useTranslation(['doctor', 'common', 'package'])
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

  const { data: hospitalList } = useGetListHospitalsQuery({
    params: {
      ...ALL_PAGINATION,
    },
  })

  const handleClearDraft = () => {
    const cleared = emptyFilter()
    setDraft(cleared)
    onApply(cleared)
    onOpenChange(false)
  }

  const handleApply = () => {
    onApply(draft)
    onOpenChange(false)
  }

  const draftIsEmpty =
    !draft.country &&
    !draft.hospitalId &&
    !draft.specialtyId &&
    !draft.gender &&
    !draft.experienceYears &&
    !draft.priceRange

  const specialtyOptions = useMemo(() => {
    return specialtiesData.map((specialty) => ({
      label: specialty.name,
      value: specialty.specialtyId.toString(),
    }))
  }, [specialtiesData])

  const hospitalOptions = useMemo(() => {
    if (!hospitalList?.data?.content) return []
    return hospitalList.data.content.map((hospital) => ({
      label: hospital.name,
      value: hospital.hospitalId.toString(),
    }))
  }, [hospitalList])

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
                  label: country.name,
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
            <Text>{t('package:filter.hospital')}</Text>
            <InputSelect
              placeholder={t('package:filter.hospital')}
              options={hospitalOptions}
              value={draft.hospitalId}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, hospitalId: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.specialty')}</Text>
            <InputSelect
              placeholder={t('filter.specialty')}
              options={specialtyOptions}
              value={draft.specialtyId?.toString()}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, specialtyId: Number(value) }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.gender')}</Text>
            <InputSelect
              placeholder={t('filter.gender')}
              options={[
                { label: t('filter.genderMale'), value: 'MALE' },
                { label: t('filter.genderFemale'), value: 'FEMALE' },
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
                { label: t('filter.experienceUnder5Years'), value: 'under-5' },
                { label: t('filter.experience5To10Years'), value: '5-10' },
                { label: t('filter.experience10To15Years'), value: '10-15' },
                { label: t('filter.experienceOver20Years'), value: 'over-20' },
              ]}
              value={draft.experienceYears}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, experienceYears: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.priceRange')}</Text>
            <InputSelect
              placeholder={t('filter.priceRange')}
              options={getPackagePriceRangeOptions((key) => t(key as any))}
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
            disabled={draftIsEmpty}
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
