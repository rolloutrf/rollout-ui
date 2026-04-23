export const formatPrice = (value: number | undefined, locale: string, currency: string) => {
  return value === undefined
    ? ''
    : Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(value)
}
