import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import km from './locales/km.json'
import vi from './locales/vi.json'

export const defaultNamespace = 'common'

export const resources = {
  en,
  km,
  vi,
} as const

export type AppLanguage = keyof typeof resources
export const supportedLanguages = Object.keys(resources) as AppLanguage[]
const namespaces = ['common', 'home', 'about', 'profile'] as const

export const LANGUAGE_STORAGE_KEY = 'language'

function normalizeLanguage(language: string | null | undefined): AppLanguage {
  if (!language) {
    return 'en'
  }

  const baseLanguage = language.toLowerCase().split('-')[0]

  if (supportedLanguages.includes(baseLanguage as AppLanguage)) {
    return baseLanguage as AppLanguage
  }

  return 'en'
}

function getInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (storedLanguage) {
    return normalizeLanguage(storedLanguage)
  }

  return normalizeLanguage(window.navigator.language)
}

function syncDocumentLanguage(language: string) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const normalizedLanguage = normalizeLanguage(language)
  document.documentElement.lang = normalizedLanguage
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage)
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    defaultNS: defaultNamespace,
    ns: [...namespaces],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
  })
}

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
i18n.on('languageChanged', syncDocumentLanguage)

export default i18n
