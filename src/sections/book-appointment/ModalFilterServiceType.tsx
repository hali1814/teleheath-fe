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
import { useGetCountryListQuery } from '#/services/query/country/country-list'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { type AppLanguage } from '#/i18n'
import { useEffect, useReducer, useRef, useState } from 'react'

interface FilterServiceType {
  country: string
}

const emptyFilter = (): FilterServiceType => ({
  country: '',
})

/**
 * Draft: ref (không setState mỗi lần chọn) + remount (`fieldKey`).
 * `defaultsSource`: sau Clear cần default rỗng; khi mở modal lấy từ `appliedFilter`.
 */
export default function ModalFilterServiceType({
  open,
  onOpenChange,
  appliedFilter,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  appliedFilter: FilterServiceType
  onApply: (filter: FilterServiceType) => void
}) {
  const { t, i18n } = useTranslation(['common'])

  const draftCountry = useRef('')

  const [fieldKey, setFieldKey] = useState(0)
  /** null = dùng appliedFilter làm default; non-null = default cho lần remount (vd. Clear) */
  const [defaultsSource, setDefaultsSource] =
    useState<FilterServiceType | null>(null)

  const [, rerender] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    if (!open) return
    setDefaultsSource(null)
    draftCountry.current = appliedFilter.country
    setFieldKey((k) => k + 1)
  }, [open, appliedFilter])

  const { data: countryList } = useGetCountryListQuery({
    params: {},
  })

  const effectiveDefaults = defaultsSource ?? appliedFilter

  const handleClearDraft = () => {
    const cleared = emptyFilter()
    setDefaultsSource(cleared)
    draftCountry.current = ''
    setFieldKey((k) => k + 1)
    rerender()
  }

  const handleApply = () => {
    onApply({
      country: draftCountry.current,
    })
    onOpenChange(false)
  }

  const draftIsEmpty = !draftCountry.current

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
              Filter
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
            <Text>Country</Text>
            <InputSelect
              defaultValue={effectiveDefaults.country || undefined}
              onValueChange={(value) => {
                draftCountry.current = value
                rerender()
              }}
              placeholder="Country"
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
