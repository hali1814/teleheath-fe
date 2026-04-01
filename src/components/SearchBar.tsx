import { cn } from '#/lib/utils'
import { Icon } from './icon'
import Text from './text'
import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  autoFocus?: boolean
  isHome?: boolean
  isAutoScroll?: boolean
  onSearch?: (query: string) => void
  onSubmit?: () => void
  onClick?: () => void
  onClear?: () => void
}

const placeholderTextClass =
  'whitespace-nowrap pr-10 text-[14px] leading-normal text-[#999999]'

/**
 * Đo chiều rộng chữ vs ô search:
 * - Chữ ngắn hơn ô (ô rộng hơn nhiều): không marquee — tránh track quá ngắn làm -50% lộ khoảng trống.
 * - Chữ dài hơn ô: marquee với mỗi “nửa” lặp đủ lần để tổng bề ngang > ô, vòng lặp mượt.
 */
function HomeSearchAutoScrollPlaceholder({
  placeholder,
}: {
  placeholder: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [mode, setMode] = useState<'static' | 'marquee' | null>(null)
  const [marqueeSegment, setMarqueeSegment] = useState('')

  useLayoutEffect(() => {
    const outer = outerRef.current
    const measure = measureRef.current
    if (!outer || !measure) return

    const run = () => {
      const cw = outer.clientWidth
      const tw = measure.scrollWidth
      if (cw <= 0 || tw <= 0) return

      // Một dòng đã nằm gọn trong ô → không cần cuộn
      if (tw <= cw + 1) {
        setMode('static')
        setMarqueeSegment('')
        return
      }

      // Mỗi nửa track (một span) phải đủ rộng so với ô để hiệu ứng không “hụt”
      const repeatsPerHalf = Math.max(1, Math.ceil(cw / tw) + 1)
      const segment = Array.from(
        { length: repeatsPerHalf },
        () => placeholder,
      ).join('\u00A0\u00A0')
      setMarqueeSegment(segment)
      setMode('marquee')
    }

    run()
    const ro = new ResizeObserver(run)
    ro.observe(outer)
    return () => ro.disconnect()
  }, [placeholder])

  return (
    <div
      ref={outerRef}
      className="relative flex min-h-[1.25em] min-w-0 flex-1 flex-col justify-center overflow-hidden text-start"
    >
      <span
        ref={measureRef}
        className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap text-[14px] leading-normal text-[#999999]"
        aria-hidden
      >
        {placeholder}
      </span>

      {mode === null && (
        <Text
          size="base_14"
          className="text-[#999999] truncate text-start leading-normal"
        >
          {placeholder}
        </Text>
      )}

      {mode === 'static' && (
        <Text
          size="base_14"
          className="text-[#999999] truncate text-start leading-normal"
        >
          {placeholder}
        </Text>
      )}

      {mode === 'marquee' && marqueeSegment && (
        <>
          <Text
            size="base_14"
            className="hidden text-[#999999] motion-reduce:block motion-reduce:truncate"
          >
            {placeholder}
          </Text>
          <div className="motion-reduce:hidden">
            <div
              className={cn(
                'search-bar-placeholder-track',
                'search-bar-placeholder-track--scroll',
              )}
            >
              <span className={placeholderTextClass}>{marqueeSegment}</span>
              <span className={placeholderTextClass}>{marqueeSegment}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function SearchBar({
  value,
  placeholder = 'Search',
  autoFocus = false,
  isHome = false,
  isAutoScroll = false,
  onSearch,
  onSubmit,
  onClick,
  onClear,
}: Props) {
  const content = (
    <>
      <Icon name="search_icon" className="w-[20px] h-[20px]" />

      {isHome ? (
        !isAutoScroll ? (
          <div className="flex min-h-[1.25em] min-w-0 flex-1 flex-col justify-center overflow-hidden text-start">
            <Text
              size="base_14"
              className="text-[#999999] truncate text-start leading-normal"
            >
              {placeholder}
            </Text>
          </div>
        ) : (
          <HomeSearchAutoScrollPlaceholder placeholder={placeholder} />
        )
      ) : (
        <input
          autoFocus={autoFocus}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSubmit?.()
            }
          }}
          className="
            flex-1 min-w-0 bg-transparent outline-none
            text-[14px] leading-normal truncate
            placeholder:text-[#999999]
          "
        />
      )}

      {!isHome && value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClear?.()
          }}
        >
          <Icon name="close" className="w-[10px] h-[10px] text-[#CCCCCC]" />
        </button>
      )}
    </>
  )

  if (isHome) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={placeholder}
        className="
          w-full flex items-center gap-[10px]
          px-[14px] py-[12px]
          rounded-[30px] bg-white
        "
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className="
        w-full flex items-center gap-[10px]
        px-[14px] py-[12px]
        rounded-[30px] bg-white
      "
    >
      {content}
    </div>
  )
}
