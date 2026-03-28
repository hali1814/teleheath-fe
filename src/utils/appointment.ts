import dayjs from 'dayjs'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'

type TranslateFn = (key: string) => string

type UpcomingBucket = 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek' | 'later'

export interface UpcomingAppointmentLabels {
  today: string
  tomorrow: string
  thisWeek: string
  nextWeek: string
  later: string
}

const FALLBACK_LABELS: UpcomingAppointmentLabels = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisWeek: 'This Week',
  nextWeek: 'Next Week',
  later: 'Later',
}

const getLocaleByLanguage = (language?: string) => {
  if ((language ?? '').startsWith('vi')) return 'vi-VN'
  if ((language ?? '').startsWith('km')) return 'km-KH'
  return 'en-US'
}

const formatDayMonth = (date: Date, locale: string) => {
  const day = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(date)
  const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
  return `${day} ${month}`
}

export function getUpcomingAppointmentLabels(
  t?: TranslateFn,
): UpcomingAppointmentLabels {
  if (!t) return FALLBACK_LABELS

  const todayKey = 'appointment:today'
  const tomorrowKey = 'appointment:tomorrow'
  const thisWeekKey = 'appointment:thisWeek'
  const nextWeekKey = 'appointment:nextWeek'
  const laterKey = 'appointment:later'

  const today = t(todayKey)
  const tomorrow = t(tomorrowKey)
  const thisWeek = t(thisWeekKey)
  const nextWeek = t(nextWeekKey)
  const later = t(laterKey)

  return {
    today: today === todayKey ? FALLBACK_LABELS.today : today,
    tomorrow: tomorrow === tomorrowKey ? FALLBACK_LABELS.tomorrow : tomorrow,
    thisWeek: thisWeek === thisWeekKey ? FALLBACK_LABELS.thisWeek : thisWeek,
    nextWeek: nextWeek === nextWeekKey ? FALLBACK_LABELS.nextWeek : nextWeek,
    later: later === laterKey ? FALLBACK_LABELS.later : later,
  }
}

const getUpcomingBucket = (
  dateValue: string,
  now: dayjs.Dayjs,
): UpcomingBucket => {
  const date = dayjs(dateValue).startOf('day')
  if (!date.isValid()) return 'later'

  const today = now.startOf('day')
  const tomorrow = today.add(1, 'day')

  if (date.isSame(today, 'day')) return 'today'
  if (date.isSame(tomorrow, 'day')) return 'tomorrow'

  const currentWeekStart = today.startOf('week')
  const currentWeekEnd = currentWeekStart.add(6, 'day').endOf('day')

  if (
    date.isAfter(tomorrow, 'day') &&
    date.isBefore(currentWeekEnd.add(1, 'millisecond'))
  ) {
    return 'thisWeek'
  }

  const nextWeekStart = currentWeekStart.add(1, 'week')
  const nextWeekEnd = nextWeekStart.add(6, 'day').endOf('day')

  if (
    (date.isSame(nextWeekStart, 'day') || date.isAfter(nextWeekStart, 'day')) &&
    (date.isSame(nextWeekEnd, 'day') || date.isBefore(nextWeekEnd, 'day'))
  ) {
    return 'nextWeek'
  }

  return 'later'
}

/**
 * Group appointment list theo 5 nhãn:
 * - Today, DD MMM
 * - Tomorrow, DD MMM
 * - This Week
 * - Next Week
 * - Later
 */
export function groupAppointmentsByUpcomingWindow(
  items: MyAppointmentItem[],
  options?: {
    labels?: UpcomingAppointmentLabels
    language?: string
    now?: Date
  },
): Record<string, MyAppointmentItem[]> {
  const now = dayjs(options?.now ?? new Date())
  const today = now.startOf('day')
  const locale = getLocaleByLanguage(options?.language)
  const labels = options?.labels ?? FALLBACK_LABELS

  const todayLabel = `${labels.today}, ${formatDayMonth(now.toDate(), locale)}`
  const tomorrowLabel = `${labels.tomorrow}, ${formatDayMonth(now.add(1, 'day').toDate(), locale)}`

  const groupedByBucket: Record<UpcomingBucket, MyAppointmentItem[]> = {
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    later: [],
  }

  const upcomingOnly = (items ?? []).filter((item) => {
    const appointmentDay = dayjs(item.appointmentDate).startOf('day')
    if (!appointmentDay.isValid()) return false
    return !appointmentDay.isBefore(today)
  })

  for (const item of upcomingOnly) {
    const bucket = getUpcomingBucket(item.appointmentDate, now)
    groupedByBucket[bucket].push(item)
  }

  return {
    [todayLabel]: groupedByBucket.today,
    [tomorrowLabel]: groupedByBucket.tomorrow,
    [labels.thisWeek]: groupedByBucket.thisWeek,
    [labels.nextWeek]: groupedByBucket.nextWeek,
    [labels.later]: groupedByBucket.later,
  }
}
