export const formatPrice = (price: number, onlyNumber: boolean = false) => {
  if (price !== 0 && !price) return '-'

  return onlyNumber
    ? price.toLocaleString('en-US')
    : price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      })
}
