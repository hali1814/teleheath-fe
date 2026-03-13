import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { t } = useTranslation(['home', 'profile', 'common', 'haohoa'])

  return (
    <main className="page-wrap flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <section className="island-shell rise-in w-full max-w-xl rounded-[2rem] p-8 text-center sm:p-10">
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
            <p>{t('common:field.firstName')}: Hao</p>
            <p>{t('common:field.lastName')}: Nguyen</p>
            <p>{t('common:field.phone')}: 012 345 678</p>
          </div>
        </div>
      </section>
    </main>
  )
}
