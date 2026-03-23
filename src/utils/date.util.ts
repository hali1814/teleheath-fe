import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

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
): string => {
  if (!date) return ''

  try {
    const dayjsDate = dayjs(date)
    if (!dayjsDate.isValid()) return ''

    const format = option || DATE_TIME_TYPE.DD_MM_YYYY
    return dayjsDate.format(format)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}
