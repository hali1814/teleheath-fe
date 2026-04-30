import type { AppLanguage } from '#/i18n'

type WorkingHour = {
  dayOfWeek: string
  morningStart: string | null
  morningEnd: string | null
  afternoonStart: string | null
  afternoonEnd: string | null
  closed: boolean
}

const DAY_ORDER = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

const DAY_LABELS: Record<AppLanguage, Record<string, string>> = {
  en: {
    MON: 'Mon',
    TUE: 'Tue',
    WED: 'Wed',
    THU: 'Thu',
    FRI: 'Fri',
    SAT: 'Sat',
    SUN: 'Sun',
  },
  vi: {
    MON: 'T2',
    TUE: 'T3',
    WED: 'T4',
    THU: 'T5',
    FRI: 'T6',
    SAT: 'T7',
    SUN: 'CN',
  },
  km: {
    MON: 'ថ្ងៃច័ន្ទ',
    TUE: 'ថ្ងៃអង្គារ',
    WED: 'ថ្ងៃពុធ',
    THU: 'ថ្ងៃព្រហស្បតិ៍',
    FRI: 'ថ្ងៃសុក្រ',
    SAT: 'ថ្ងៃសៅរ៍',
    SUN: 'ថ្ងៃអាទិត្យ',
  },
}

const CLOSED_LABEL: Record<string, string> = {
  en: 'CLOSED',
  vi: 'Đóng cửa',
  km: 'បិទ',
}

export const formatWorkingHours = (
  data: WorkingHour[],
  language: AppLanguage,
) => {
  const labels = DAY_LABELS[language]

  const sorted = [...data].sort(
    (a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek),
  )

  const getKey = (d: WorkingHour) => {
    if (d.closed) return 'CLOSED'
    return formatTimeRange(d) ?? 'CLOSED'
  }

  const result: Record<string, string> = {}
  let tempGroup: WorkingHour[] = []

  const pushGroup = () => {
    if (!tempGroup.length) return

    const first = tempGroup[0]
    const key = getKey(first)

    const startDay = labels[tempGroup[0].dayOfWeek] ?? tempGroup[0].dayOfWeek
    const endDay =
      labels[tempGroup[tempGroup.length - 1].dayOfWeek] ??
      tempGroup[tempGroup.length - 1].dayOfWeek

    const dayRange = tempGroup.length === 1 ? startDay : `${startDay}-${endDay}`

    const value =
      key === 'CLOSED' ? CLOSED_LABEL[language] : (formatTimeRange(first) ?? '')

    result[dayRange] = value
    tempGroup = []
  }

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i]
    const prev = tempGroup[tempGroup.length - 1]

    if (!prev) {
      tempGroup.push(current)
      continue
    }

    if (getKey(prev) === getKey(current)) {
      tempGroup.push(current)
    } else {
      pushGroup()
      tempGroup.push(current)
    }
  }

  pushGroup()

  return result
}

const formatTimeRange = (hour: WorkingHour) => {
  const starts = [hour.morningStart, hour.afternoonStart].filter(
    Boolean,
  ) as string[]
  const ends = [hour.morningEnd, hour.afternoonEnd].filter(Boolean) as string[]

  if (!starts.length || !ends.length) return null

  const earliestOpen = starts.reduce((acc, curr) => (curr < acc ? curr : acc))
  const latestClose = ends.reduce((acc, curr) => (curr > acc ? curr : acc))

  return `${earliestOpen} - ${latestClose}`
}

export const isClosedLabel = (value: string, language: AppLanguage) => {
  return value === CLOSED_LABEL[language]
}
