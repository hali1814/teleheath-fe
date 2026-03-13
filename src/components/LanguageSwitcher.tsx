import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { supportedLanguages, type AppLanguage } from '@/i18n'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')
  const currentLanguage = ((i18n.resolvedLanguage ?? i18n.language ?? 'en')
    .split('-')[0] as AppLanguage)

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="inline-flex items-center gap-1 rounded-full border border-(--chip-line) bg-(--chip-bg) p-1 shadow-[0_8px_22px_rgba(30,90,72,0.08)]"
    >
      {supportedLanguages.map((language) => {
        const isActive = currentLanguage === language

        return (
          <button
            key={language}
            type="button"
            onClick={() => void i18n.changeLanguage(language)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-semibold transition',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-(--sea-ink-soft) hover:bg-(--link-bg-hover) hover:text-(--sea-ink)'
            )}
          >
            {t(`language.${language}`)}
          </button>
        )
      })}
    </div>
  )
}
