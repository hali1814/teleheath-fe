import Text from '#/components/text'
import { useClampExpand } from '#/hooks/use-clamp-expand'
import { cn } from '#/lib/utils'
import ExpandViewButton from '../common/ExpandViewButton'
import { useTranslation } from 'react-i18next'
import type { Doctor } from '#/entities/doctorEntity'
import i18n from '#/i18n'

export default function AboutDoctor({ bio }: Pick<Doctor, 'bio'>) {
  const { t } = useTranslation(['doctor', 'common'])
  const {
    ref: bodyRef,
    expanded,
    needsExpand,
    toggle,
  } = useClampExpand({
    contentKey: `${i18n.language}:${bio}`,
  })

  return (
    <div className="w-full flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('about')}
      </Text>
      <div className="relative">
        <div
          ref={bodyRef}
          className={cn(
            'text-base text-muted-foreground leading-[1.7] font-normal',
            expanded ? '' : 'line-clamp-6',
          )}
        >
          {bio}
        </div>
        {needsExpand && !expanded && (
          <div
            className="flex justify-center absolute -bottom-1 left-0 right-0 h-[32px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(251, 250, 250, 0.527027) 30.5%, rgba(250, 249, 249, 0.88) 61%, #F8F6F6 80.45%)',
            }}
          >
            <ExpandViewButton expanded={expanded} onClick={toggle} />
          </div>
        )}
        {needsExpand && expanded && (
          <div className="w-full flex justify-center">
            <ExpandViewButton expanded={expanded} onClick={toggle} />
          </div>
        )}
      </div>
    </div>
  )
}
