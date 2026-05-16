import { useEffect, useRef } from 'react'

interface UseInfiniteScrollParams {
  /** Optional scroll container. If omitted or its current value is not
   *  the scroll container, the browser window is used. */
  rootRef?: React.RefObject<HTMLElement | null>
  targetRef: React.RefObject<HTMLElement | null>
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => unknown
  /** Distance in px before the sentinel at which to trigger fetch. */
  threshold?: number
}

export function useInfiniteScroll({
  rootRef,
  targetRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 200,
}: UseInfiniteScrollParams) {
  const stateRef = useRef({ hasNextPage, isFetchingNextPage, fetchNextPage })
  stateRef.current = { hasNextPage, isFetchingNextPage, fetchNextPage }

  useEffect(() => {
    if (!hasNextPage) return
    const rootEl = rootRef?.current ?? null
    const scrollSource: Window | HTMLElement = rootEl ?? window

    const check = () => {
      const state = stateRef.current
      if (!state.hasNextPage || state.isFetchingNextPage) return
      const node = targetRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const viewportBottom = rootEl
        ? rootEl.getBoundingClientRect().bottom
        : window.innerHeight
      if (rect.top - viewportBottom < threshold) {
        state.fetchNextPage()
      }
    }

    scrollSource.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      scrollSource.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, rootRef, targetRef, threshold])
}
