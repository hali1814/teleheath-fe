import { BottomSheet } from '#/components/BottomSheet'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { useTranslation } from 'react-i18next'
import {
  LANGUAGE_STORAGE_KEY,
  supportedLanguages,
  type AppLanguage,
} from '@/i18n'
import { useEffect, useMemo, useState } from 'react'

interface BottomSheetTranslateProps {
  open: boolean
  onClose: () => void
}

export function BottomSheetTranslate({
  open,
  onClose,
}: BottomSheetTranslateProps) {
  const { i18n, t } = useTranslation(['profile', 'common'])
  const currentLanguage = useMemo(
    () =>
      (i18n.resolvedLanguage ?? i18n.language ?? 'en').split(
        '-',
      )[0] as AppLanguage,
    [i18n.language, i18n.resolvedLanguage],
  )

  const [selectedLanguage, setSelectedLanguage] =
    useState<AppLanguage>(currentLanguage)

  useEffect(() => {
    if (!open) return
    setSelectedLanguage(currentLanguage)
  }, [open, currentLanguage])

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={t('profile:pleaseSelectLanguage')}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {supportedLanguages.map((language) => (
            <LanguageOption
              key={language}
              code={language}
              label={t(`common:language.${language}`)}
              selected={selectedLanguage === language}
              onSelect={() => setSelectedLanguage(language)}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            className="flex-1 rounded-full bg-[#E6E6E6] py-3 shadow-none hover:bg-[#E5E5E5] h-[45px]"
            onClick={onClose}
          >
            <Text
              size="base_14"
              className="w-full text-center font-normal text-sea-ink-soft"
            >
              {t('common:actions.cancel')}
            </Text>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1 rounded-full py-3 h-[45px]"
            onClick={async () => {
              window.localStorage.setItem(
                LANGUAGE_STORAGE_KEY,
                selectedLanguage,
              )
              await i18n.changeLanguage(selectedLanguage)
              onClose()
            }}
          >
            <Text
              size="base_14"
              className="w-full text-center font-medium text-white"
            >
              {t('common:actions.done')}
            </Text>
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

interface LanguageOptionProps {
  code: AppLanguage
  label: string
  selected?: boolean
  onSelect?: () => void
}

function LanguageOption({
  //   code,
  label,
  selected,
  onSelect,
}: LanguageOptionProps) {
  //   const flagName =
  //     code === 'km' ? 'flag_km' : code === 'vi' ? 'flag_vi' : 'flag_en'
  return (
    <Button
      type="button"
      variant="ghost"
      className="flex w-full items-center justify-start gap-3 rounded-full px-2 py-1 shadow-none hover:bg-transparent"
      onClick={onSelect}
    >
      <span
        className={cn(
          'inline-flex size-5 items-center justify-center rounded-full border-2',
          selected ? 'border-badge' : 'border-[#CCCCCC]',
        )}
        aria-hidden="true"
      >
        {selected ? (
          <span className="inline-flex size-3 rounded-full bg-badge " />
        ) : null}
      </span>
      {/* <Icon name={flagName} className="h-3 w-[18px] shrink-0" /> */}
      <Text size="base_14" className="font-normal text-[#666666]">
        {label}
      </Text>
    </Button>
  )
}
