import Image from '#/components/image'
import { cn } from '#/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const scrollbarHide =
  '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'

export type CarouselImageItem = {
  id: string | number
  src: string
  alt: string
}

type CarouselProps = {
  className?: string
  trackClassName?: string
  /** Khoảng cách giữa các card (px). Mặc định 8 — mỗi slide vẫn full bề ngang vùng nhìn thấy */
  gap?: number
  /** Padding ngang track (px). Mặc định 0 — card full theo khối cha (vd đã có px ở layout). */
  paddingX?: number
  hideScrollbar?: boolean
  /** Nút trước/sau (mặc định ẩn trên mobile) */
  showArrows?: boolean
  /** Dots: pill đỏ + chấm nhạt (mặc định bật khi có > 1 slide) */
  showIndicators?: boolean
  items?: CarouselImageItem[]
  slideClassName?: string
  classNameImage?: string
  /** Chiều cao ảnh (slide cố định theo chiều cao này) */
  imageHeight?: string
  children?: ReactNode
}

function getSlideCount(
  items: CarouselImageItem[] | undefined,
  children: ReactNode,
): number {
  if (items && items.length > 0) return items.length
  return Children.count(children)
}

/**
 * Carousel cuộn ngang: mỗi card **full width** vùng nhìn thấy, `gap` giữa các slide (mặc định 8px),
 * chiều cao ảnh mặc định **180px**. Indicator: slide đang xem = pill; còn lại = chấm nhạt.
 */
export default function Carousel({
  className,
  trackClassName,
  gap = 8,
  paddingX = 0,
  hideScrollbar = true,
  showArrows = false,
  showIndicators,
  items,
  slideClassName,
  classNameImage,
  imageHeight = 'h-[180px]',
  children,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRaf = useRef<number>(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const slideCount = useMemo(
    () => getSlideCount(items, children),
    [items, children],
  )

  const indicatorsOn = showIndicators !== false && slideCount > 1

  const updateActiveFromScroll = useCallback(() => {
    const root = trackRef.current
    if (!root || slideCount === 0) return

    const slides = root.querySelectorAll<HTMLElement>('[data-carousel-slide]')
    if (slides.length === 0) return

    const rootRect = root.getBoundingClientRect()
    const centerX = rootRect.left + rootRect.width / 2

    let bestIdx = 0
    let bestDist = Infinity
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect()
      const slideCenter = r.left + r.width / 2
      const dist = Math.abs(slideCenter - centerX)
      if (dist < bestDist) {
        bestDist = dist
        bestIdx = i
      }
    })
    setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx))
  }, [slideCount])

  const onScroll = useCallback(() => {
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    scrollRaf.current = requestAnimationFrame(() => {
      updateActiveFromScroll()
    })
  }, [updateActiveFromScroll])

  useEffect(() => {
    const root = trackRef.current
    if (!root) return
    updateActiveFromScroll()
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      root.removeEventListener('scroll', onScroll)
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    }
  }, [onScroll, updateActiveFromScroll, slideCount, items, children])

  useEffect(() => {
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updateActiveFromScroll())
        : null
    if (trackRef.current && ro) ro.observe(trackRef.current)
    return () => ro?.disconnect()
  }, [updateActiveFromScroll])

  const scrollByDir = useCallback(
    (dir: -1 | 1) => {
      const el = trackRef.current
      if (!el) return
      const first = el.querySelector<HTMLElement>('[data-carousel-slide]')
      const w = first?.offsetWidth ?? el.clientWidth
      // Một bước = rộng slide + gap (flex gap không tính trong offsetWidth)
      const step = w + gap
      el.scrollBy({ left: step * dir, behavior: 'smooth' })
    },
    [gap],
  )

  const scrollToIndex = useCallback((index: number) => {
    const root = trackRef.current
    if (!root) return
    const slides = root.querySelectorAll<HTMLElement>('[data-carousel-slide]')
    if (index < 0 || index >= slides.length) return
    const slide = slides[index]

    const slideLeft = slide.offsetLeft
    const slideW = slide.offsetWidth
    const trackW = root.clientWidth
    const target = slideLeft - (trackW - slideW) / 2
    const maxScroll = root.scrollWidth - trackW
    root.scrollTo({
      left: Math.min(maxScroll, Math.max(0, target)),
      behavior: 'smooth',
    })
  }, [])

  const content =
    items && items.length > 0
      ? items.map((item) => (
          <CarouselSlide
            key={item.id}
            className={cn(
              'box-border w-full min-w-full shrink-0 basis-full overflow-hidden rounded-[16px] bg-muted/30 shadow-sm',
              imageHeight,
              slideClassName,
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              className={cn('h-full w-full object-cover', classNameImage)}
            />
          </CarouselSlide>
        ))
      : children

  return (
    <div className={cn('relative w-full min-w-0', className)}>
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous slides"
            onClick={() => scrollByDir(-1)}
            className={cn(
              'absolute top-1/2 left-1 z-10 -translate-y-1/2',
              'flex size-9 items-center justify-center rounded-full border border-border bg-background/95 shadow-sm',
              'text-foreground hover:bg-muted max-sm:hidden',
            )}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next slides"
            onClick={() => scrollByDir(1)}
            className={cn(
              'absolute top-1/2 right-1 z-10 -translate-y-1/2',
              'flex size-9 items-center justify-center rounded-full border border-border bg-background/95 shadow-sm',
              'text-foreground hover:bg-muted max-sm:hidden',
            )}
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        className={cn(
          'flex touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth',
          'snap-x snap-mandatory [-webkit-overflow-scrolling:touch]',
          hideScrollbar && scrollbarHide,
          trackClassName,
        )}
        style={{
          gap: `${gap}px`,
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
      >
        {content}
      </div>

      {indicatorsOn && (
        <div
          className="mt-3 flex items-center justify-center gap-[6px] px-2"
          role="group"
          aria-label="Carousel pagination"
        >
          {Array.from({ length: slideCount }, (_, i) => {
            const active = i === activeIndex
            return (
              <button
                key={i}
                type="button"
                aria-current={active ? 'true' : undefined}
                aria-label={`Go to slide ${i + 1} of ${slideCount}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  'flex items-center justify-center p-2',
                  '-m-2 touch-manipulation',
                )}
              >
                <span
                  className={cn(
                    'rounded-full transition-[width,background-color] duration-300 ease-out',
                    active
                      ? 'h-[4px] w-[24px] bg-[#D33131]'
                      : 'h-[4px] w-[8px] bg-[#D3313133]',
                  )}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Mỗi card: full width track + snap + `data-carousel-slide` */
export function CarouselSlide({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-carousel-slide
      className={cn(
        'box-border w-full min-w-full shrink-0 basis-full snap-start snap-always',
        className,
      )}
    >
      {children}
    </div>
  )
}
