import { cn } from '@rollout/ui-kit'

import { formatPrice } from '../utils/formatPrice'

import type { PriceProps, PriceTextSize } from '../types/Price.types'

const PRICE_SIZE_CLASS: Record<PriceTextSize, { main: string; discount: string; percents: string }> = {
  md: {
    main: 'text-base leading-6',
    discount: 'text-sm leading-6',
    percents: 'text-xs leading-5',
  },
  lg: {
    main: 'text-3xl leading-9',
    discount: 'text-lg leading-7',
    percents: 'text-base leading-6',
  },
}

export const Price = ({
  currentPrice,
  originalPrice,
  locale = 'ru-RU',
  currency = 'RUB',
  size = 'md',
  subtitle,
  className,
}: PriceProps) => {
  const discount =
    originalPrice !== undefined && originalPrice > 0
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : undefined

  const priceClassName = PRICE_SIZE_CLASS[size]
  const formattedCurrentPrice = formatPrice(currentPrice, locale, currency)
  const formattedOriginalPrice = formatPrice(originalPrice, locale, currency)

  return (
    <div className={cn('inline-flex flex-col gap-0.5', className)} data-state="price">
      <p className={cn('font-bold whitespace-nowrap', priceClassName.main)}>{formattedCurrentPrice}</p>

      {(formattedOriginalPrice || discount !== undefined) && (
        <div className="flex items-center gap-1.5">
          {formattedOriginalPrice && (
            <p className={cn('line-through text-muted-foreground whitespace-nowrap', priceClassName.discount)}>
              {formattedOriginalPrice}
            </p>
          )}
          {discount !== undefined && discount > 0 && (
            <p className={cn('text-sm leading-5 text-destructive', priceClassName.percents)}>-{discount}%</p>
          )}
        </div>
      )}

      {subtitle && <p className="text-sm leading-5 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
