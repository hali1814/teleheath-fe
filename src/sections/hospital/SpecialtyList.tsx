import Text from '#/components/text'
import { useClampExpand } from '#/hooks/use-clamp-expand'
import ExpandViewButton from '../common/ExpandViewButton'
import { useTranslation } from 'react-i18next'
import { SpecialtyChip } from './SpecialtyChip'
import type { Specialty } from '#/types/specialty'

export default function SpecialtyList({
  specialties,
}: {
  specialties: Pick<Specialty, 'id' | 'name' | 'iconUrl'>[]
}) {
  const contentKey = specialties.map((s) => s.id).join(',')
  const {
    ref: listRef,
    expanded,
    needsExpand,
    toggle,
    collapsedContainerStyle,
  } = useClampExpand({
    contentKey,
    flexClamp: {
      maxRows: 4,
      rowHeightPx: 32,
      gapPx: 16,
    },
  })
  const { t } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] py-[12px] bg-[#F8F6F6]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('specialties')}
      </Text>
      <div className="relative">
        <div
          ref={listRef}
          style={collapsedContainerStyle}
          className="flex flex-wrap gap-[16px] overflow-hidden"
        >
          {specialties.length > 0 &&
            specialties.map((specialty) => (
              <SpecialtyChip
                key={specialty.id}
                name={specialty.name}
                icon={specialty.iconUrl}
              />
            ))}
        </div>
        {needsExpand && !expanded && (
          <div
            className="flex justify-center absolute bottom-0 left-0 right-0 h-[32px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(251, 250, 250, 0.527027) 30.5%, rgba(250, 249, 249, 0.88) 61%, #F8F6F6 80.45%)',
            }}
          >
            <ExpandViewButton expanded={expanded} onClick={toggle} />
          </div>
        )}
        {needsExpand && expanded && (
          <div className="h-[32px] w-full flex justify-center items-center mt-[4px]">
            <ExpandViewButton expanded={expanded} onClick={toggle} />
          </div>
        )}
      </div>
    </div>
  )
}
