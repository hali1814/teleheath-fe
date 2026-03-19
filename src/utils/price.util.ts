export const formatPrice = (price: number) => {
  if (!price) return '-'

  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
