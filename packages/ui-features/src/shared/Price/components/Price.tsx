import { cn } from '@rollout/ui-kit'

import { formatPrice } from '../utils/formatPrice'

import type { PriceProps, PriceTextSize } from '../types/Price.types'

const PRICE_SIZE_CLASS: Record<PriceTextSize, string> = {
  sm: 'text-base leading-6',
  md: 'text-xl leading-7',
  lg: 'text-2xl leading-8',
  xl: 'text-3xl leading-9',
}

export const Price = ({
  currentPrice,
  originalPrice,
  locale = 'ru-RU',
  currency = 'RUB',
  size = 'sm',
  subtitle,
  className,
}: PriceProps) => {
  const discount =
    originalPrice !== undefined && originalPrice > 0
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : undefined

  const formattedCurrentPrice = formatPrice(currentPrice, locale, currency)
  const formattedOriginalPrice = formatPrice(originalPrice, locale, currency)

  return (
    <div className={cn('flex flex-col gap-0.5 w-full', className)} data-state="price">
      <p className={cn('font-bold text-foreground whitespace-nowrap', PRICE_SIZE_CLASS[size])}>
        {formattedCurrentPrice}
      </p>

      {(formattedOriginalPrice || discount !== undefined) && (
        <div className="flex items-center gap-1.5">
          {formattedOriginalPrice && (
            <p className="text-sm line-through leading-5 text-muted-foreground whitespace-nowrap">
              {formattedOriginalPrice}
            </p>
          )}
          {discount !== undefined && discount > 0 && <p className="text-sm leading-5 text-destructive">-{discount}%</p>}
        </div>
      )}

      {subtitle && <p className="text-sm leading-5 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
