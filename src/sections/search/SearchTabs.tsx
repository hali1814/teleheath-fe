import Text from '#/components/text'
import { cn } from '#/lib/utils'
import type { Tab } from '#/routes/app/search/(commonLayout)'

const tabs: { key: Tab; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'HOSPITAL', label: 'Hospitals' },
  { key: 'DOCTOR', label: 'Doctors' },
  { key: 'PACKAGE', label: 'Packages' },
]

export default function SearchTabs({
  value,
  onChange,
}: {
  value: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <div className="flex gap-[6px] px-[16px] py-[8px] overflow-x-auto">
      {tabs.map((tab) => {
        const active = value === tab.key

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
              {tab.label}
            </Text>
          </button>
        )
      })}
    </div>
  )
}
