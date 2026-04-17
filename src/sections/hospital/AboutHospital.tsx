import Text from '#/components/text'
import { useClampExpand } from '#/hooks/use-clamp-expand'
import { cn } from '#/lib/utils'
import { sanitizeTipTapHtml } from '#/utils/sanitize-tiptap-html'
import { useMemo } from 'react'
import ExpandViewButton from '../common/ExpandViewButton'
import { useTranslation } from 'react-i18next'

export default function AboutHospital({ aboutUs }: { aboutUs: string }) {
  const safeAboutHtml = useMemo(() => sanitizeTipTapHtml(aboutUs), [aboutUs])
  const { ref: bodyRef, expanded, needsExpand, toggle } = useClampExpand({
    contentKey: safeAboutHtml,
  })
  const { t } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('aboutUs')}
      </Text>
      <div className="relative">
        <div
          ref={bodyRef}
          className={cn(
            'prose prose-sm max-w-none text-muted-foreground leading-[1.7] font-normal [&_img]:my-[16px] [&_img]:rounded-[6px]',
            expanded ? '' : 'line-clamp-5',
          )}
          dangerouslySetInnerHTML={{ __html: safeAboutHtml }}
        />
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
