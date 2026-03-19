import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { useTranslation } from 'react-i18next'

export default function CountryList() {
  const { t } = useTranslation(['common'])

  const CountryItem = ({
    label,
    isActive,
  }: {
    label: string
    isActive: boolean
  }) => {
    const textColor = isActive
      ? 'text-white font-medium'
      : 'text-muted-foreground font-normal'
    const bgColor = isActive ? 'bg-primary' : 'bg-white'
    return (
      <Badge
        variant="outline"
        className={cn('h-[37px] flex gap-[10px] px-[20px]', bgColor)}
      >
        {isActive && (
          <Icon name="check" className="w-[16px] h-[16px]" color="white" />
        )}
        <Text className={cn('leading-normal', textColor)}>{label}</Text>
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-[8px]">
      <CountryItem label={t('common:countries.all')} isActive={true} />
      <CountryItem label={t('common:countries.vietnam')} isActive={false} />
      <CountryItem label={t('common:countries.cambodia')} isActive={false} />
    </div>
  )
}
