import type { BannerNavigationType } from '#/services/query/banner/list-banners'
import type { AnyRouter } from '@tanstack/react-router'

/**
 * Backend có thể trả `/packages` trong khi app dùng `/app/package`.
 */
export function normalizeInternalBannerHref(raw: string): string {
  try {
    const url = new URL(raw, window.location.origin)
    let pathname = url.pathname
    if (pathname === '/packages' || pathname.startsWith('/packages/')) {
      pathname = pathname.replace(/^\/packages/, '/app/package')
    }
    return `${pathname}${url.search}${url.hash}`
  } catch {
    return raw
  }
}

/**
 * EXTERNAL: tab mới. INTERNAL: SPA `history.push` sau khi chuẩn hoá path.
 */
export function navigateBannerTarget(
  router: AnyRouter,
  raw: string,
  navigationType: BannerNavigationType,
) {
  const target = raw.trim()
  if (!target) return

  if (navigationType === 'EXTERNAL') {
    window.open(target, '_blank', 'noopener,noreferrer')
    return
  }

  const href = normalizeInternalBannerHref(target)
  router.navigate({ href })
}
