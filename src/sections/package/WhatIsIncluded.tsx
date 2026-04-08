import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'

const IncludedItem = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-[16px]">
      <Icon
        name="check_circle_outline"
        className="w-[16px] h-[16px] text-primary"
      />
      <div className="flex-1 flex flex-col gap-[6px]">
        <Text className="font-medium leading-normal text-[#333333]">
          {name}
        </Text>
      </div>
    </div>
  )
}

export default function WhatIsIncluded({
  checkupTypes,
}: {
  checkupTypes: string[]
}) {
  const { t } = useTranslation(['package'])

  return (
    <div className="flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('whatIsIncluded')}
      </Text>
      {checkupTypes.map((item, index) => (
        <IncludedItem key={index} name={item} />
      ))}
    </div>
  )
}
