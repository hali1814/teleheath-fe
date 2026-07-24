import { createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'

import i18n from '#/i18n'
import TermsView from '#/sections/terms/TermsView'
import { PRIVACY_SECTION_ID } from '#/sections/terms/terms-content'

export const Route = createFileRoute('/app/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { search, hash } = useLocation()

  const searchParams = new URLSearchParams(search as Record<string, string>)
  // The native WebView passes the active app language (`km` | `en`) via `?lang=`.
  const lang = searchParams.get('lang')
  // Privacy Policy link opens the same page anchored to Clause 9, either via
  // `#privacy` or `?section=privacy` (WebViews sometimes strip the hash).
  const scrollToPrivacy = useMemo(
    () =>
      hash === PRIVACY_SECTION_ID ||
      searchParams.get('section') === PRIVACY_SECTION_ID,
    [hash, searchParams],
  )

  useEffect(() => {
    if (lang === 'km' || lang === 'kh') {
      void i18n.changeLanguage('km')
    } else if (lang === 'en') {
      void i18n.changeLanguage('en')
    }
  }, [lang])

  const language = lang ?? i18n.resolvedLanguage ?? i18n.language

  return <TermsView language={language} scrollToPrivacy={scrollToPrivacy} />
}
