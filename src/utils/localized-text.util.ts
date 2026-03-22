import type { AppLanguage } from '#/i18n'

/** Pick localized string from vi / kh / en variants by current app language. */
export const getLocalizedTextByLang = (
  textVi: string,
  textKh: string | null,
  textEn: string,
  lang: AppLanguage,
) => {
  switch (lang) {
    case 'km':
      return textKh || textEn || textVi
    case 'vi':
      return textVi || textEn
    default:
      return textEn || textVi
  }
}
