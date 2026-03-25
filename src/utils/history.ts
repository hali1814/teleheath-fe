import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'

type TranslateFn = (key: string) => string

const FALLBACK_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MONTH_KEYS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const

export interface AppointmentMonthLabels {
  thisMonth: string
  months: string[]
}

/**
 * Lấy bộ nhãn tháng đã dịch. Nếu chưa có i18n key sẽ fallback tiếng Anh.
 */
export function getAppointmentMonthLabels(
  t?: TranslateFn,
): AppointmentMonthLabels {
  if (!t) {
    return {
      thisMonth: 'This month',
      months: FALLBACK_MONTHS,
    }
  }

  const months = MONTH_KEYS.map((monthKey, index) => {
    const key = `appointment:months.${monthKey}`
    const translated = t(key)
    return translated === key ? FALLBACK_MONTHS[index] : translated
  })

  const thisMonthKey = 'appointment:thisMonth'
  const thisMonthTranslated = t(thisMonthKey)

  return {
    thisMonth:
      thisMonthTranslated === thisMonthKey ? 'This month' : thisMonthTranslated,
    months,
  }
}

/**
 * Group appointment list theo tháng:
 * - Tháng hiện tại -> key "This month" (dịch được)
 * - Các tháng khác -> key dạng "OCTOBER 2025"
 * - Thứ tự item: từ tương lai -> quá khứ
 */
export function groupAppointmentsByMonth(
  items: MyAppointmentItem[],
  labels?: AppointmentMonthLabels,
): Record<string, MyAppointmentItem[]> {
  const monthLabels = labels ?? {
    thisMonth: 'This month',
    months: FALLBACK_MONTHS,
  }

  const sorted = [...items].sort((a, b) => {
    if (a.appointmentDate !== b.appointmentDate) {
      return b.appointmentDate.localeCompare(a.appointmentDate)
    }
    return (b.startTime ?? '').localeCompare(a.startTime ?? '')
  })

  const grouped: Record<string, MyAppointmentItem[]> = {}

  for (const item of sorted) {
    const [yearRaw, monthRaw] = item.appointmentDate.split('-')
    const year = Number(yearRaw)
    const month = Number(monthRaw)

    if (
      !Number.isFinite(year) ||
      !Number.isFinite(month) ||
      month < 1 ||
      month > 12
    ) {
      const fallbackKey = item.appointmentDate
      grouped[fallbackKey] = [...(grouped[fallbackKey] ?? []), item]
      continue
    }

    const key = `${(monthLabels.months[month - 1] ?? FALLBACK_MONTHS[month - 1]).toUpperCase()} ${year}`

    grouped[key] = [...(grouped[key] ?? []), item]
  }

  return grouped
}
