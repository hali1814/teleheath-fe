import Text from '#/components/text'
import { cn } from '#/lib/utils'
import type { Tab } from '#/routes/app/search/(commonLayout)'
import { useTranslation } from 'react-i18next'

const tabs: { key: Tab; labelKey: 'all' | 'hospitals' | 'doctors' | 'packages' }[] =
  [
    { key: 'ALL', labelKey: 'all' },
    { key: 'HOSPITAL', labelKey: 'hospitals' },
    { key: 'DOCTOR', labelKey: 'doctors' },
    { key: 'PACKAGE', labelKey: 'packages' },
  ]

type TabCounts = {
  all: number
  hospitals: number
  doctors: number
  packages: number
}

const countKeyByTab: Record<Tab, keyof TabCounts> = {
  ALL: 'all',
  HOSPITAL: 'hospitals',
  DOCTOR: 'doctors',
  PACKAGE: 'packages',
}

type SearchTabsProps = {
  counts?: TabCounts
  variant?: 'underline' | 'round'
  value: Tab
  onChange: (tab: Tab) => void
}

export default function SearchTabs({
  counts,
  variant = 'underline',
  value,
  onChange,
}: SearchTabsProps) {
  const { t } = useTranslation(['search'])

  return (
    <div
      className={cn(
        'flex gap-[6px] px-[16px]',
        variant === 'round'
          ? 'pt-[16px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'pt-[8px]',
      )}
    >
      {tabs.map((tab) => {
        const active = value === tab.key

        if (variant === 'underline') {
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={cn(
                'flex-1 h-[30px] border-b-2',
                active ? 'border-primary' : 'border-transparent',
              )}
            >
              <Text
                className={cn(
                  'font-medium leading-normal text-center',
                  active ? 'text-primary' : 'text-text-secondary',
                )}
              >
                {t(`tabs.${tab.labelKey}`)}
              </Text>
            </button>
          )
        }

        const count = counts?.[countKeyByTab[tab.key]] ?? 0

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              'shrink-0 whitespace-nowrap rounded-[30px] px-[20px] py-[8px] bg-primary',
              active ? 'bg-primary' : 'bg-white',
            )}
          >
            <Text
              as="span"
              className={cn(
                'font-medium leading-normal text-center',
                active ? 'text-white' : 'text-muted-foreground',
              )}
            >
              {`${t(`tabs.${tab.labelKey}`)} (${count})`}
            </Text>
          </button>
        )
      })}
    </div>
  )
}
