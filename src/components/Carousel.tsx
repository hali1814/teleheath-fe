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
  /** Khoảng cách giữa các card (px) */
  gap?: number
  /** Padding ngang của vùng cuộn (px) — mobile: nên ≥ 16 để cân với layout */
  paddingX?: number
  hideScrollbar?: boolean
  /** Nút trước/sau (mặc định ẩn trên mobile) */
  showArrows?: boolean
  /** Dots: pill đỏ + chấm nhạt (mặc định bật khi có > 1 slide) */
  showIndicators?: boolean
  items?: CarouselImageItem[]
  slideClassName?: string
  classNameImage?: string
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
 * Carousel cuộn ngang, tối ưu mobile (snap, swipe, không scrollbar).
 * Indicator: slide đang xem = pill rộng màu primary; còn lại = chấm tròn nhạt.
 */
export default function Carousel({
  className,
  trackClassName,
  gap = 12,
  paddingX = 16,
  hideScrollbar = true,
  showArrows = false,
  showIndicators,
  items,
  slideClassName,
  classNameImage,
  imageHeight = 'h-[160px]',
  children,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRaf = useRef<number>(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const slideCount = useMemo(
    () => getSlideCount(items, children),
    [items, children],
  )

  const indicatorsOn =
    showIndicators !== false && slideCount > 1

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

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const delta = Math.max(el.clientWidth * 0.72, 200) * dir
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
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
    },
    [],
  )

  const content =
    items && items.length > 0
      ? items.map((item) => (
          <CarouselSlide
            key={item.id}
            className={cn(
              'w-[min(92vw,300px)] overflow-hidden rounded-[16px] bg-muted/30 shadow-sm sm:w-[min(88vw,280px)]',
              slideClassName,
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              className={cn('w-full object-cover', imageHeight, classNameImage)}
            />
          </CarouselSlide>
        ))
      : children

  return (
    <div className={cn('relative w-full', className)}>
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
          className="mt-3 flex items-center justify-center gap-2 px-2"
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
                  'flex min-h-[44px] min-w-[44px] items-center justify-center p-2',
                  '-m-2 touch-manipulation',
                )}
              >
                <span
                  className={cn(
                    'rounded-full transition-[width,background-color] duration-300 ease-out',
                    active
                      ? 'h-2 w-6 bg-primary'
                      : 'h-2 w-2 bg-[#FADDDD]',
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

/** Mỗi card: snap + `data-carousel-slide` để tính indicator */
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
      className={cn('shrink-0 snap-start snap-always', className)}
    >
      {children}
    </div>
  )
}
