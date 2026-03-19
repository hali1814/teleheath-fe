import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { useState } from 'react'
import ExpandViewButton from '../common/ExpandViewButton'
import { useTranslation } from 'react-i18next'

const SpecialtyItem = ({ name, icon }: { name: string; icon: IconName }) => {
  return (
    <Badge className="h-[32px] flex gap-[8px] px-[16px] rounded-[12px] bg-[#FFEBE9]">
      <Icon name={icon} className="w-[12px] h-[12px]" color="var(--primary)" />
      <Text size="sm_12" className="font-medium text-primary">
        {name}
      </Text>
    </Badge>
  )
}

export default function SpecialtyList({
  specialties,
}: {
  specialties: string[]
}) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('specialties')}
      </Text>
      <div className="relative">
        <div
          className={cn(
            'flex flex-wrap gap-[16px] overflow-hidden',
            expanded ? '' : 'max-h-[170px]',
          )}
        >
          {specialties.length > 0 &&
            specialties.map((specialty, index) => (
              <SpecialtyItem key={index} name={specialty} icon="appointment" />
            ))}
        </div>
        {!expanded && (
          <div className="flex justify-center absolute -bottom-1 left-0 right-0 h-[32px] bg-[linear-gradient(180deg,#FFFFFF00_0%,#FBFAFA_52.7%,#FAF9F9_88%,#F8F6F6_100%)]">
            <ExpandViewButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
        {expanded && (
          <div className="h-[32px] w-full flex justify-center items-center mt-[4px]">
            <ExpandViewButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
