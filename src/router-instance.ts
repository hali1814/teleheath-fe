import type { AnyRouter } from '@tanstack/react-router'

/** Router được gán từ `main.tsx` — dùng cho axios interceptor (ngoài React). */
let router: AnyRouter | null = null

export function registerRouter(r: AnyRouter) {
  router = r
}

export function getRouter(): AnyRouter | null {
  return router
}
