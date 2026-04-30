import dayjs from 'dayjs'
import 'dayjs/locale/km'
import 'dayjs/locale/vi'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import i18n, { type AppLanguage } from '#/i18n'

// Extend dayjs with plugins
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export enum DATE_TIME_TYPE {
  YYYY_MM = 'YYYY-MM',
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYY_MM_DD_12 = 'YYYY-MM-DD hh:mm A',
  YYYY_MM_DD_24 = 'YYYY-MM-DD HH:mm',
  DD_MM_YYYY = 'DD-MM-YYYY',
  DD_MM_YYYY_12 = 'DD-MM-YYYY hh:mm A',
  DD_MM_YYYY_24 = 'DD-MM-YYYY HH:mm',
  YYYY_MM_DD_HH_mm_ss = 'YYYY-MM-DD HH:mm:ss',
  YYYY_MM_DD_HH = 'YYYY-MM-DD HH',
  MM_YYYY = 'MM-YYYY',
  MMM_DD_YYYY_HH_mm_A = 'MMM DD, YYYY • hh:mm A',
  MMM_DD_YYYY = 'MMM DD, YYYY',
  DDDD_MMM_D_YYYY = 'dddd, MMM D, YYYY',
}

/**
 * Format date string to specified format
 * @param date - Date string or Date object
 * @param option - Format option from DATE_TIME_TYPE enum
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date | null | undefined,
  option?: DATE_TIME_TYPE,
  language?: AppLanguage | string,
): string => {
  if (!date) return ''

  try {
    const dayjsDate = dayjs(date)
    if (!dayjsDate.isValid()) return ''

    const format = option || DATE_TIME_TYPE.DD_MM_YYYY
    const locale = getDayjsLocale(language)
    return dayjsDate.locale(locale).format(format)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

const getDayjsLocale = (language?: AppLanguage | string): string => {
  const normalized = (
    language ??
    i18n.resolvedLanguage ??
    i18n.language ??
    'en'
  )
    .toLowerCase()
    .split('-')[0]

  if (normalized === 'vi') return 'vi'
  if (normalized === 'km') return 'km'
  return 'en'
}
