/** Giá trị `value` InputSelect kinh nghiệm — map sang `minExperience` / `maxExperience` của API */
export function experienceKeyToMinMax(key: string): {
  minExperience?: number
  maxExperience?: number
} {
  switch (key) {
    case 'under-5':
      return { minExperience: 0, maxExperience: 5 }
    case '5-10':
      return { minExperience: 5, maxExperience: 10 }
    case '10-15':
      return { minExperience: 10, maxExperience: 15 }
    case 'over-20':
      return { minExperience: 20 }
    default:
      return {}
  }
}

/** Khôi phục option select từ URL (min/max đã apply) */
export function experienceMinMaxToKey(
  min?: number,
  max?: number,
): string {
  if (min === undefined && max === undefined) return ''
  if (min === 0 && max === 5) return 'under-5'
  if (min === 5 && max === 10) return '5-10'
  if (min === 10 && max === 15) return '10-15'
  if (min === 20 && max === undefined) return 'over-20'
  return ''
}
