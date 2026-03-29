import Image from '#/components/image'
import Text from '#/components/text'
import { cn } from '#/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'

const MAX_IMAGE = 6

const scrollbarHide =
  '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'

function FullscreenImageViewer({
  images,
  initialIndex,
  open,
  onClose,
}: {
  images: string[]
  initialIndex: number
  open: boolean
  onClose: () => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollRaf = useRef<number>(0)
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  useEffect(() => {
    if (open) setActiveIndex(initialIndex)
  }, [open, initialIndex])

  useEffect(() => {
    if (!open) return
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior) => {
      const el = scrollerRef.current
      if (!el || !el.clientWidth) return
      const i = Math.min(images.length - 1, Math.max(0, index))
      el.scrollTo({ left: i * el.clientWidth, behavior })
    },
    [images.length],
  )

  useEffect(() => {
    if (!open) return
    const el = scrollerRef.current
    if (!el) return

    const apply = () => {
      const w = el.clientWidth
      if (w > 0) {
        scrollToIndex(initialIndex, 'auto')
        return
      }
      requestAnimationFrame(apply)
    }
    requestAnimationFrame(apply)
  }, [open, initialIndex, scrollToIndex])

  const onScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el || !el.clientWidth) return
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    scrollRaf.current = requestAnimationFrame(() => {
      const i = Math.round(el.scrollLeft / el.clientWidth)
      setActiveIndex(Math.min(images.length - 1, Math.max(0, i)))
    })
  }, [images.length])

  useEffect(() => {
    return () => {
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery fullscreen"
    >
      <div className="absolute inset-x-0 top-0 z-110 flex items-center justify-between px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <Text size="sm_12" className="font-medium text-white/90">
          {activeIndex + 1} / {images.length}
        </Text>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close gallery"
        >
          <X className="size-6" strokeWidth={2} />
        </button>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className={cn(
          'flex h-full min-h-0 w-full touch-pan-x snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain',
          scrollbarHide,
        )}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex h-full min-h-0 w-full min-w-full shrink-0 snap-center snap-always items-center justify-center px-2 pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <img
              src={src}
              alt={`${i + 1} / ${images.length}`}
              className="max-h-full max-w-full object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GalleryImage({ images }: { images: string[] }) {
  const { t } = useTranslation(['hospital', 'common'])
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)

  const visible = images.slice(0, MAX_IMAGE)
  const extraCount = Math.max(0, images.length - MAX_IMAGE)

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('gallery')}
      </Text>
      <div className="w-full grid grid-cols-3 gap-[16px]">
        {visible.length > 0 &&
          visible.map((image, index) => {
            const showMoreOverlay = extraCount > 0 && index === MAX_IMAGE - 1
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                className="relative block w-full overflow-hidden rounded-[8px] text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={() => {
                  setViewerIndex(index)
                  setViewerOpen(true)
                }}
              >
                <Image
                  src={image}
                  alt=""
                  className="aspect-square rounded-[8px]"
                />
                {showMoreOverlay && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[8px] bg-black/60">
                    <Text className="font-medium leading-normal text-white">
                      +{extraCount}
                    </Text>
                  </div>
                )}
              </button>
            )
          })}
      </div>

      <FullscreenImageViewer
        images={images}
        initialIndex={viewerIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  )
}
