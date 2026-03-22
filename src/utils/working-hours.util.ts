import type { AppLanguage } from '#/i18n'

type WorkingHour = {
  day: string
  open: boolean
  openTime: string | null
  closeTime: string | null
}

const DAY_ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const DAY_LABELS: Record<AppLanguage, Record<string, string>> = {
  en: {
    Mo: 'Mon',
    Tu: 'Tue',
    We: 'Wed',
    Th: 'Thu',
    Fr: 'Fri',
    Sa: 'Sat',
    Su: 'Sun',
  },
  vi: {
    Mo: 'Th 2',
    Tu: 'Th 3',
    We: 'Th 4',
    Th: 'Th 5',
    Fr: 'Th 6',
    Sa: 'Th 7',
    Su: 'CN',
  },
  km: {
    Mo: 'ចន្ទ',
    Tu: 'អង្គារ',
    We: 'ពុធ',
    Th: 'ព្រហស្បតិ៍',
    Fr: 'សុក្រ',
    Sa: 'សៅរ៍',
    Su: 'អាទិត្យ',
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
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  )

  const getKey = (d: WorkingHour) => {
    if (!d.open) return 'CLOSED'
    return `${d.openTime}-${d.closeTime}`
  }

  const result: Record<string, string> = {}
  let tempGroup: WorkingHour[] = []

  const pushGroup = () => {
    if (!tempGroup.length) return

    const first = tempGroup[0]
    const key = getKey(first)

    const startDay = labels[tempGroup[0].day]
    const endDay = labels[tempGroup[tempGroup.length - 1].day]

    const dayRange = tempGroup.length === 1 ? startDay : `${startDay}-${endDay}`

    const value =
      key === 'CLOSED'
        ? CLOSED_LABEL[language]
        : `${first.openTime} - ${first.closeTime}`

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

export const isClosedLabel = (value: string, language: AppLanguage) => {
  return value === CLOSED_LABEL[language]
}
