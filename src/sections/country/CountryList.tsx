import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { useTranslation } from 'react-i18next'

const CountryItem = ({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) => {
  const textColor = isActive
    ? 'text-white font-medium'
    : 'text-muted-foreground font-normal'
  const bgColor = isActive ? 'bg-primary' : 'bg-white'
  return (
    <Badge
      variant="outline"
      className={cn('h-[37px] flex gap-[10px] px-[20px]', bgColor)}
      onClick={onClick}
    >
      {isActive && (
        <Icon name="check" className="w-[16px] h-[16px]" color="white" />
      )}
      <Text className={cn('leading-normal', textColor)}>{label}</Text>
    </Badge>
  )
}

export default function CountryList({
  activeCountry,
  onClick,
}: {
  activeCountry: 'VN' | 'KH' | 'all'
  onClick: (country: 'VN' | 'KH' | 'all') => void
}) {
  const { t } = useTranslation(['common'])

  return (
    <div className="flex items-center gap-[8px]">
      <CountryItem
        label={t('common:countries.all')}
        isActive={activeCountry === 'all'}
        onClick={() => onClick('all')}
      />
      <CountryItem
        label={t('common:countries.vietnam')}
        isActive={activeCountry === 'VN'}
        onClick={() => onClick('VN')}
      />
      <CountryItem
        label={t('common:countries.cambodia')}
        isActive={activeCountry === 'KH'}
        onClick={() => onClick('KH')}
      />
    </div>
  )
}
