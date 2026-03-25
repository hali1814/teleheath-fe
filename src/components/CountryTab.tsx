import { cn } from '#/lib/utils'
import { Icon } from './icon'
import Text from './text'

export default function CountryTab({
  tabs,
  value,
  onChange,
}: {
  tabs: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      className="w-full h-[45px] flex items-center justify-between rounded-[30px] bg-secondary/5 px-[4px]"
      style={{
        boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.05) inset',
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={cn(
            'h-[37px] flex-1 flex items-center justify-center gap-[6px] rounded-[30px]',
            tab.value === value ? 'bg-white' : '',
          )}
          style={{
            boxShadow:
              tab.value === value ? '0px 1px 2px -1px rgba(0, 0, 0, 0.1)' : '',
          }}
          onClick={() => onChange(tab.value)}
        >
          <Icon name="map_marker" className="w-[14px] h-[14px] text-primary" />
          <Text
            size="base_14"
            className="font-medium leading-normal text-center text-primary"
          >
            {tab.label}
          </Text>
        </div>
      ))}
    </div>
  )
}
