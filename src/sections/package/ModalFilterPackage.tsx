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
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useGetListHospitalsQuery } from '#/services/query/hospital/list-hospitals'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { ALL_PAGINATION } from '#/const/pagination'
import { PACKAGE_PRICE_RANGE_OPTIONS } from '#/sections/package/package-filter-price'

const emptyFilter = (): FilterPackage => ({
  country: '',
  hospitalId: '',
  priceRange: '',
  specialtyId: undefined,
})

/**
 * Draft: ref (không setState mỗi lần chọn) + remount (`fieldKey`).
 * `defaultsSource`: sau Clear cần default rỗng; khi mở modal lấy từ `appliedFilter`.
 */
export default function ModalFilterPackage({
  open,
  onOpenChange,
  appliedFilter,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  appliedFilter: FilterPackage
  onApply: (filter: FilterPackage) => void
}) {
  const { t, i18n } = useTranslation(['package', 'common'])

  const draftCountry = useRef('')
  const draftHospitalId = useRef('')
  const draftSpecialtyId = useRef('')
  const draftPriceRange = useRef('')

  const [fieldKey, setFieldKey] = useState(0)
  /** null = dùng appliedFilter làm default; non-null = default cho lần remount (vd. Clear) */
  const [defaultsSource, setDefaultsSource] = useState<FilterPackage | null>(
    null,
  )

  const [, rerender] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    if (!open) return
    setDefaultsSource(null)
    draftCountry.current = appliedFilter.country
    draftHospitalId.current = appliedFilter.hospitalId
    draftSpecialtyId.current =
      appliedFilter.specialtyId != null
        ? String(appliedFilter.specialtyId)
        : ''
    draftPriceRange.current = appliedFilter.priceRange
    setFieldKey((k) => k + 1)
  }, [open, appliedFilter])

  const { data: countryList } = useGetCountryListQuery({
    params: {},
  })

  const { data: hospitalList } = useGetListHospitalsQuery({
    params: {
      ...ALL_PAGINATION,
    },
  })

  const { data: { data: specialtiesData = [] } = { data: [] } } =
    useGetListSpecialtyQuery({
      params: {},
      enabled: open,
    })

  const effectiveDefaults = defaultsSource ?? appliedFilter

  const handleClearDraft = () => {
    const cleared = emptyFilter()
    setDefaultsSource(cleared)
    draftCountry.current = ''
    draftHospitalId.current = ''
    draftSpecialtyId.current = ''
    draftPriceRange.current = ''
    setFieldKey((k) => k + 1)
    rerender()
  }

  const handleApply = () => {
    const sid = draftSpecialtyId.current.trim()
    const specialtyIdParsed = Number(sid)
    onApply({
      country: draftCountry.current,
      hospitalId: draftHospitalId.current,
      priceRange: draftPriceRange.current,
      specialtyId:
        sid !== '' && Number.isFinite(specialtyIdParsed)
          ? specialtyIdParsed
          : undefined,
    })
    onOpenChange(false)
  }

  const draftIsEmpty =
    !draftCountry.current &&
    !draftHospitalId.current &&
    !draftSpecialtyId.current &&
    !draftPriceRange.current

  const hospitalOptions = useMemo(() => {
    if (!hospitalList?.data?.content) return []
    return hospitalList?.data?.content?.map((hospital) => ({
      label: getLocalizedTextByLang(
        hospital.nameVi,
        null,
        hospital.nameEn,
        i18n.language as AppLanguage,
      ),
      value: hospital.hospitalId,
    }))
  }, [hospitalList, i18n.language])

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
        className="gap-[20px] bg-white px-[20px] py-[24px]"
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
        <div key={fieldKey} className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.country')}</Text>
            <InputSelect
              defaultValue={effectiveDefaults.country || undefined}
              onValueChange={(value) => {
                draftCountry.current = value
                rerender()
              }}
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
              defaultValue={effectiveDefaults.hospitalId || undefined}
              onValueChange={(value) => {
                draftHospitalId.current = value
                rerender()
              }}
              placeholder={t('filter.hospital')}
              options={hospitalOptions}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.specialty')}</Text>
            <InputSelect
              defaultValue={
                effectiveDefaults.specialtyId != null
                  ? String(effectiveDefaults.specialtyId)
                  : undefined
              }
              onValueChange={(value) => {
                draftSpecialtyId.current = value
                rerender()
              }}
              placeholder={t('filter.specialty')}
              options={specialtyOptions}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.priceRange')}</Text>
            <InputSelect
              defaultValue={effectiveDefaults.priceRange || undefined}
              onValueChange={(value) => {
                draftPriceRange.current = value
                rerender()
              }}
              placeholder={t('filter.priceRange')}
              options={PACKAGE_PRICE_RANGE_OPTIONS}
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
