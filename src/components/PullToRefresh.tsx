import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Spinner } from './ui/spinner'

type PullToRefreshProps = {
  onRefresh: () => Promise<unknown>
  children: ReactNode
}

export default function PullToRefresh({
  onRefresh,
  children,
}: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number | null>(null)
  const pullingRef = useRef(false)
  const activeScrollTopRef = useRef(0)
  const pullDistanceRef = useRef(0)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const MAX_PULL_DISTANCE = 90
  const TRIGGER_DISTANCE = 54

  const setPullDistanceSafe = (value: number) => {
    pullDistanceRef.current = value
    setPullDistance(value)
  }

  const getScrollableParent = (
    target: EventTarget | null,
    container: HTMLElement,
  ) => {
    let node: HTMLElement | null =
      target instanceof HTMLElement ? target : container

    while (node && node !== container) {
      const style = window.getComputedStyle(node)
      const canScrollY =
        (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
        node.scrollHeight > node.clientHeight

      if (canScrollY) return node
      node = node.parentElement
    }

    return document.scrollingElement as HTMLElement | null
  }

  useEffect(() => {
    const previousOverscroll = document.body.style.overscrollBehaviorY
    document.body.style.overscrollBehaviorY = 'none'

    return () => {
      document.body.style.overscrollBehaviorY = previousOverscroll
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (event: TouchEvent) => {
      if (isRefreshing) return

      const scrollable = getScrollableParent(event.target, container)
      const currentScrollTop = scrollable?.scrollTop ?? 0
      activeScrollTopRef.current = currentScrollTop
      if (currentScrollTop > 0) {
        startYRef.current = null
        pullingRef.current = false
        setPullDistanceSafe(0)
        return
      }

      startYRef.current = event.touches[0]?.clientY ?? null
      pullingRef.current = true
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!pullingRef.current || startYRef.current == null || isRefreshing)
        return

      const currentY = event.touches[0]?.clientY
      if (currentY == null) return

      const deltaY = currentY - startYRef.current
      if (deltaY <= 0) {
        setPullDistanceSafe(0)
        return
      }

      // If inner list is not at top, do not start pull-to-refresh.
      if (activeScrollTopRef.current > 0) {
        setPullDistanceSafe(0)
        return
      }

      // Keep content fixed and drive a top overlay only.
      event.preventDefault()
      const damped = Math.min(MAX_PULL_DISTANCE, deltaY * 0.45)
      setPullDistanceSafe(damped)
    }

    const resetPull = () => {
      startYRef.current = null
      pullingRef.current = false
      activeScrollTopRef.current = 0
      setPullDistanceSafe(0)
    }

    const handleTouchEnd = async () => {
      if (isRefreshing) {
        resetPull()
        return
      }

      const shouldRefresh = pullDistanceRef.current >= TRIGGER_DISTANCE
      resetPull()
      if (!shouldRefresh) return

      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }

    container.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [isRefreshing, onRefresh])

  const indicatorVisible = isRefreshing || pullDistance > 0
  const indicatorProgress = Math.min(1, pullDistance / TRIGGER_DISTANCE)
  const canRenderPortal = typeof document !== 'undefined'
  const indicator = (
    <div
      className="pointer-events-none fixed inset-x-0 top-16 z-999 flex justify-center"
      aria-hidden={!indicatorVisible}
    >
      <div
        className="mt-[10px] rounded-full bg-white/90 px-2 py-2 shadow-sm transition-all duration-150"
        style={{
          opacity: indicatorVisible ? 1 : 0,
          transform: `translateY(${isRefreshing ? 0 : Math.max(0, 22 - pullDistance)}px)`,
        }}
      >
        <Spinner
          className="size-6 text-primary"
          style={{
            opacity: isRefreshing ? 1 : Math.max(0.35, indicatorProgress),
          }}
        />
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-180px)] relative z-0">
      {canRenderPortal ? createPortal(indicator, document.body) : indicator}
      {children}
    </div>
  )
}
