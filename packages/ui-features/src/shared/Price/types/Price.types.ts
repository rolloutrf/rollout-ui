export type PriceTextSize = 'md' | 'lg'

export type PriceProps = {
  currentPrice: number
  originalPrice?: number
  locale?: string
  currency?: string
  size?: PriceTextSize
  subtitle?: React.ReactNode
  className?: string
}
