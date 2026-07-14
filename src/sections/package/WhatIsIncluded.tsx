import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import type { CheckupTypeEntity } from '#/entities/packageEntity'

const IncludedItem = ({ item }: { item: CheckupTypeEntity }) => {
  return (
    <div className="flex items-start gap-[16px]">
      <Icon
        name="check_circle_outline"
        className="w-[16px] h-[16px] text-primary mt-1"
      />
      <div className="flex-1 flex flex-col gap-[4px]">
        <Text className="font-medium leading-normal text-[#333333]">
          {item.name}
        </Text>
        {item.description && (
          <Text size="sm_12" className="text-[#666666] whitespace-pre-line leading-relaxed">
            {item.description}
          </Text>
        )}
      </div>
    </div>
  )
}

export default function WhatIsIncluded({
  checkupTypes,
}: {
  checkupTypes: CheckupTypeEntity[]
}) {
  const { t } = useTranslation(['package'])

  return (
    <div className="flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('whatIsIncluded')}
      </Text>
      {checkupTypes.map((item, index) => (
        <IncludedItem key={index} item={item} />
      ))}
    </div>
  )
}
