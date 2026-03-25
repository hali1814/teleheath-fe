import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

export type FlexClampConfig = {
  /** Số hàng tối đa khi thu gọn (vd chip flex-wrap) */
  maxRows: number
  /** Chiều cao một hàng (px), khớp chiều cao item */
  rowHeightPx: number
  /** Khoảng cách giữa các hàng (px), khớp `gap` của flex */
  gapPx: number
}

type UseClampExpandOptions = {
  contentKey: unknown
  /**
   * Thu gọn theo chiều cao = `maxRows * rowHeightPx + (maxRows - 1) * gapPx`.
   * Trả về `collapsedContainerStyle` — không cần `max-h-*` trên component.
   */
  flexClamp?: FlexClampConfig
}

function collapsedHeightPxFromFlexClamp(c: FlexClampConfig): number {
  const { maxRows, rowHeightPx, gapPx } = c
  return maxRows * rowHeightPx + (maxRows - 1) * gapPx
}

/** Gắn `ref` lên node khi thu gọn (line-clamp hoặc `collapsedContainerStyle`); `needsExpand` khi nội dung tràn. */
export function useClampExpand({
  contentKey,
  flexClamp,
}: UseClampExpandOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [needsExpand, setNeedsExpand] = useState(false)

  const collapsedContainerStyle = useMemo((): CSSProperties | undefined => {
    if (!flexClamp || expanded) return undefined
    return { maxHeight: collapsedHeightPxFromFlexClamp(flexClamp) }
  }, [
    expanded,
    flexClamp?.maxRows,
    flexClamp?.rowHeightPx,
    flexClamp?.gapPx,
  ])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const checkOverflow = () => {
      if (expanded) return
      setNeedsExpand(el.scrollHeight > el.clientHeight + 1)
    }

    checkOverflow()

    const ro = new ResizeObserver(checkOverflow)
    ro.observe(el)
    return () => ro.disconnect()
  }, [contentKey, expanded])

  const toggle = useCallback(() => {
    setExpanded((v) => !v)
  }, [])

  return {
    ref,
    expanded,
    setExpanded,
    toggle,
    needsExpand,
    collapsedContainerStyle,
  }
}
