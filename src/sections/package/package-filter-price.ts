/** Giá trị `value` của InputSelect khoảng giá — map sang query API */
export const PACKAGE_PRICE_RANGE_OPTIONS: {
  label: string
  value: string
}[] = [
  { label: 'Under 100$', value: '0-100' },
  { label: '100 - 300$', value: '100-300' },
  { label: '300 - 500$', value: '300-500' },
  { label: 'Above 500$', value: '500' },
]

export function priceRangeKeyToMinMax(
  key: string,
): { minPrice?: number; maxPrice?: number } {
  switch (key) {
    case '0-100':
      return { minPrice: 0, maxPrice: 100 }
    case '100-300':
      return { minPrice: 100, maxPrice: 300 }
    case '300-500':
      return { minPrice: 300, maxPrice: 500 }
    case '500':
      return { minPrice: 500 }
    default:
      return {}
  }
}

/** Khôi phục option select từ URL (min/max đã apply) */
export function minMaxToPriceRangeKey(
  min?: number,
  max?: number,
): string {
  if (min === undefined && max === undefined) return ''
  if (min === 0 && max === 100) return '0-100'
  if (min === 100 && max === 300) return '100-300'
  if (min === 300 && max === 500) return '300-500'
  if (min === 500 && max === undefined) return '500'
  return ''
}
