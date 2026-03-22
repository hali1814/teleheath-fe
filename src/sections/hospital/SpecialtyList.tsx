import Text from '#/components/text'
import { cn } from '#/lib/utils'
import { useState } from 'react'
import ExpandViewButton from '../common/ExpandViewButton'
import { useTranslation } from 'react-i18next'
import { SpecialtyChip } from './SpecialtyChip'
import type { Specialty } from '#/services/query/hospital/hospital-detail'

export default function SpecialtyList({
  specialties,
}: {
  specialties: Specialty[]
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
              <SpecialtyChip
                key={index}
                name={specialty.name}
                icon={specialty.iconUrl}
              />
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
