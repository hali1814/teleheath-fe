import Text from '#/components/text'
import { Icon } from '#/components/icon'
import { useTranslation } from 'react-i18next'

export default function ExpandViewButton({
  expanded,
  ...props
}: { expanded: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation(['common'])

  return (
    <div {...props}>
      <div className="h-full flex items-center gap-[6px]">
        <Text className="text-dust-red-8 leading-[1.7] font-medium cursor-pointer">
          {expanded ? t('actions.viewLess') : t('actions.viewMore')}
        </Text>
        {expanded ? (
          <Icon name="arrow_up" className="w-[8px] h-[8px] text-dust-red-8" />
        ) : (
          <Icon name="arrow_down" className="w-[8px] h-[8px] text-dust-red-8" />
        )}
      </div>
    </div>
  )
}
