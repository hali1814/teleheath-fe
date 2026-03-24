import type { PatientProfileResponse } from '#/services/query/profile/getProfile'

/**
 * Chữ ký tên hiển thị avatar: "Dev Patient" → "DP", một từ → 2 ký tự đầu hoặc 1 ký tự.
 */
export function getInitialsFromName(name: string | null | undefined): string {
  const trimmed = name?.trim()
  if (!trimmed) return '?'

  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'

  if (parts.length === 1) {
    const w = parts[0]
    return w.length >= 2
      ? w.slice(0, 2).toUpperCase()
      : w.charAt(0).toUpperCase()
  }

  const first = parts[0].charAt(0)
  const last = parts[parts.length - 1].charAt(0)
  return (first + last).toUpperCase()
}

export const concatAddress = (address: PatientProfileResponse['address']) => {
  return `${address?.detail || ''} ${address?.districtName || ''} ${address?.cityName || ''} ${address?.countryName || ''}`
}
