export type PriceTextSize = 'sm' | 'md' | 'lg' | 'xl'

export type PriceProps = {
  currentPrice: number
  originalPrice?: number
  locale?: string
  currency?: string
  size?: PriceTextSize
  subtitle?: React.ReactNode
  className?: string
}
