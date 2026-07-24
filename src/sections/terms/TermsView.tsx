import { useEffect } from 'react'

import Text from '#/components/text'
import { cn } from '#/lib/utils'

import {
  getTermsDoc,
  PRIVACY_SECTION_ID,
  type TermsBlock,
  type TermsSection,
} from './terms-content'

interface TermsViewProps {
  /** `en` | `km` (accepts `kh`). Falls back to English. */
  language?: string | null
  /** When true, scroll to the privacy clause on mount (native "Privacy Policy" link). */
  scrollToPrivacy?: boolean
}

function Block({ block, isKhmer }: { block: TermsBlock; isKhmer: boolean }) {
  const leading = isKhmer ? 'leading-loose' : 'leading-relaxed'

  if (block.type === 'def') {
    return (
      <p className={cn('text-[15px] text-text-secondary', leading)}>
        <span className="font-semibold text-text-primary">{block.term}</span>{' '}
        {block.text}
      </p>
    )
  }

  if (block.type === 'item') {
    return (
      <div className="flex gap-2">
        <span
          className={cn(
            'shrink-0 font-semibold text-text-primary',
            'min-w-[2.5rem] text-[15px]',
            leading,
          )}
        >
          {block.label}
        </span>
        <p className={cn('flex-1 text-[15px] text-text-secondary', leading)}>
          {block.text}
        </p>
      </div>
    )
  }

  return (
    <p className={cn('text-[15px] text-text-secondary', leading)}>
      {block.text}
    </p>
  )
}

function Section({
  section,
  isKhmer,
}: {
  section: TermsSection
  isKhmer: boolean
}) {
  return (
    <section id={section.id} className="flex scroll-mt-4 flex-col gap-3">
      <Text
        as="h2"
        size="lg_16"
        className="font-semibold text-text-primary"
      >
        {section.num}. {section.title}
      </Text>
      <div className="flex flex-col gap-2.5">
        {section.blocks.map((block, index) => (
          <Block key={index} block={block} isKhmer={isKhmer} />
        ))}
      </div>
    </section>
  )
}

export default function TermsView({
  language,
  scrollToPrivacy = false,
}: TermsViewProps) {
  const doc = getTermsDoc(language)
  const base = (language ?? 'en').toLowerCase().split('-')[0]
  const isKhmer = base === 'km' || base === 'kh'

  useEffect(() => {
    if (!scrollToPrivacy) {
      return
    }
    const el = document.getElementById(PRIVACY_SECTION_ID)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [scrollToPrivacy, language])

  return (
    <article
      lang={isKhmer ? 'km' : 'en'}
      className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 pb-16 pt-6"
    >
      <header className="flex flex-col gap-1.5 border-b border-border pb-5">
        <Text
          as="h1"
          size="xl_18"
          className="font-semibold leading-snug text-text-primary"
        >
          {doc.title}
        </Text>
        <Text size="sm_12" className="text-text-tertiary">
          {doc.effectiveDateLabel}
        </Text>
      </header>

      {doc.sections.map((section) => (
        <Section key={section.num} section={section} isKhmer={isKhmer} />
      ))}
    </article>
  )
}
