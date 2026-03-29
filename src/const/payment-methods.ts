/**
 * Logo + id dùng chung bước Review (booking) và chi tiết thanh toán (appointment detail).
 */
export const BOOKING_PAYMENT_METHODS = [
  { id: 1, name: 'KHQR', logo: '/payment-method/khqr.png' },
  { id: 2, name: 'EMoney', logo: '/payment-method/e-money.png' },
  { id: 3, name: 'ABA Bank', logo: '/payment-method/aba-bank.png' },
] as const

export function getBookingPaymentMethodMeta(method: string | undefined): {
  logo: string | null
  label: string
} {
  const raw = (method ?? '').trim()
  if (!raw) return { logo: null, label: '—' }

  const byExact = BOOKING_PAYMENT_METHODS.find(
    (m) => m.name.toLowerCase() === raw.toLowerCase(),
  )
  if (byExact) return { logo: byExact.logo, label: byExact.name }

  const compact = raw.toUpperCase().replace(/[\s-]/g, '')
  const byCompact = BOOKING_PAYMENT_METHODS.find(
    (m) => m.name.toUpperCase().replace(/[\s-]/g, '') === compact,
  )
  if (byCompact) return { logo: byCompact.logo, label: byCompact.name }

  return { logo: null, label: raw }
}
