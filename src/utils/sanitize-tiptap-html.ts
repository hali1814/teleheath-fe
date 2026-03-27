import DOMPurify from 'dompurify'

/**
 * Sanitize HTML stored from TipTap (admin) and returned by the API before
 * rendering with dangerouslySetInnerHTML.
 */
export function sanitizeTipTapHtml(html: string | null | undefined): string {
  const trimmed = (html ?? '').trim()
  if (!trimmed) return ''

  return DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'strike',
      'sub',
      'sup',
      'ul',
      'ol',
      'li',
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'code',
      'span',
      'div',
      'mark',
      'hr',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
  })
}
