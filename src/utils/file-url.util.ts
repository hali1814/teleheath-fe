/**
 * Cùng host backend với `vercel.json` / `vite.config` proxy.
 *
 * API thường trả URL tuyệt đối `http://103…:8080/api/uploads/...` — trên Vercel (HTTPS)
 * cần dùng đường dẫn cùng origin `/api/...` (đã có rewrite `/api/:path*` → backend).
 *
 * Mọi path dưới backend origin (vd. `/api/uploads/…`, `/files/…`) đều được quy về path tương đối.
 */
const DEFAULT_BACKEND_ORIGIN = 'https://teleheath.site/api'

function backendOrigin(): string {
  const fromEnv = import.meta.env.VITE_PUBLIC_BACKEND_ORIGIN as
    | string
    | undefined
  const raw = fromEnv?.trim() || DEFAULT_BACKEND_ORIGIN
  return raw.replace(/\/$/, '')
}

//
export function fileUrlForSameOriginDisplay(
  url: string | undefined,
): string | undefined {
  if (!url) return url
  const origin = backendOrigin()
  if (!url.startsWith(origin)) return url
  try {
    const u = new URL(url)
    return `${u.pathname}${u.search}${u.hash}`
  } catch {
    return url.slice(origin.length) || '/'
  }
}
