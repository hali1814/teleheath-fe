import Text from '#/components/text'
import { cn } from '#/lib/utils'
import { useState } from 'react'
import ExpandViewButton from '../common/ExpandViewButton'
import { useTranslation } from 'react-i18next'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

export default function AboutDoctor({
  bioVi,
  bioKh,
  bioEn,
}: {
  bioVi: string
  bioKh: string
  bioEn: string
}) {
  const [expanded, setExpanded] = useState(false)
  const { t, i18n } = useTranslation(['doctor', 'common'])
  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('about')}
      </Text>
      <div className="relative">
        <Text
          className={cn(
            'text-muted-foreground leading-[1.7] font-normal',
            expanded ? '' : 'line-clamp-6',
          )}
        >
          {getLocalizedTextByLang(bioVi, bioKh, bioEn, i18n.language as AppLanguage)}
        </Text>
        {!expanded && (
          <div className="flex justify-center absolute -bottom-1 left-0 right-0 h-[32px] bg-[linear-gradient(180deg,#FFFFFF00_0%,#FBFAFA_52.7%,#FAF9F9_88%,#F8F6F6_100%)]">
            <ExpandViewButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
        {expanded && (
          <div className="w-full flex justify-center">
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
