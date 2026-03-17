import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import type { ReactNode } from 'react'
import { useState } from 'react'
import LocationBadge from './LocationBadge'

export interface CountryTabItem {
  /** Giá trị duy nhất của tab (dùng cho value/onValueChange) */
  value: string
  /** Nhãn hiển thị trên tab (truyền vào LocationBadge) */
  label: string
  /** Nội dung hiển thị khi tab được chọn */
  content?: ReactNode
  /** Tab có bị disabled không (không thể chọn) */
  disabled?: boolean
}

export interface CountryTabProps {
  /** Danh sách tab (số lượng tùy ý) */
  tabs: CountryTabItem[]
  /** Tab được chọn mặc định (nếu không truyền sẽ lấy tab đầu tiên) */
  defaultValue?: string
}

export default function CountryTab({ tabs, defaultValue }: CountryTabProps) {
  const firstValue = tabs[0]?.value
  const [activeValue, setActiveValue] = useState<string>(
    defaultValue ?? firstValue ?? '',
  )

  if (tabs.length === 0) return null

  return (
    <Tabs value={activeValue} onValueChange={setActiveValue} className="w-full">
      <TabsList className="w-full h-[45px]! p-[4px] flex items-center justify-center rounded-[30px] gap-[10px] bg-secondary/5">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-[30px] h-[37px]!"
            onClick={() => setActiveValue(tab.value)}
            disabled={tab.disabled}
          >
            <LocationBadge
              location={tab.label}
              disabled={activeValue !== tab.value}
              className="font-medium leading-normal"
            />
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
