import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

type ItemCardPriceProps = Pick<ItemCardProps, 'price' | 'originalPrice' | 'discount'>

export function ItemCardPrice({ price, originalPrice, discount }: ItemCardPriceProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-base font-bold leading-6 text-foreground whitespace-nowrap">{price}</p>
      {originalPrice && (
        <div className="flex items-center gap-1.5">
          <p className="text-sm line-through leading-5 text-foreground">{originalPrice}</p>
          {discount && <p className="text-sm leading-5 text-destructive">{discount}</p>}
        </div>
      )}
    </div>
  )
}
