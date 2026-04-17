export function getGoogleMapsHref(
  raw?: string | null,
  fallbackQuery?: string | null,
): string | null {
  const trimmed = (raw ?? '').trim()

  const makeSearchHref = () => {
    const q = (fallbackQuery ?? '').trim()
    if (!q) return null
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  }

  if (!trimmed) return makeSearchHref()

  // Backend sometimes returns a full iframe embed HTML; extract its src.
  const iframeSrcMatch = trimmed.match(/<iframe[\s\S]*?\ssrc=["']([^"']+)["']/i)
  const candidate = (iframeSrcMatch?.[1] ?? trimmed).trim()

  const normalized =
    candidate.startsWith('//') ? `https:${candidate}` : candidate

  try {
    const url = new URL(normalized)
    if (!/^https?:$/.test(url.protocol)) return makeSearchHref()
    return url.toString()
  } catch {
    return makeSearchHref()
  }
}

