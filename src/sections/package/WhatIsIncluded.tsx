import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'

const IncludedItem = ({
  name,
  description,
}: {
  name: string
  description: string
}) => {
  return (
    <div className="flex items-center gap-[16px] rounded-[12px] bg-white p-[16px]">
      <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
        <Icon
          name="check_circle_outline"
          className="w-[16px] h-[16px] text-primary"
        />
      </div>
      <div className="flex-1 flex flex-col gap-[6px]">
        <Text className="font-medium leading-normal text-[#333333]">
          {name}
        </Text>
        <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
          {description}
        </Text>
      </div>
    </div>
  )
}

export default function WhatIsIncluded({
  includedItems,
}: {
  includedItems: { name: string; description: string }[]
}) {
  const { t } = useTranslation(['package'])

  return (
    <div className="flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('whatIsIncluded')}
      </Text>
      {includedItems.map((item) => (
        <IncludedItem key={item.name} {...item} />
      ))}
    </div>
  )
}
