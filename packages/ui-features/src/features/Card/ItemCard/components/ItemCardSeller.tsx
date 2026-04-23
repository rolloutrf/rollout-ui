import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

type ItemCardSellerProps = Pick<ItemCardProps, 'seller' | 'rating' | 'reviewCount'>

export function ItemCardSeller({ seller, rating, reviewCount }: ItemCardSellerProps) {
  if (!seller) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-sm font-bold leading-5 text-foreground">{seller}</span>
      {rating && (
        <div className="flex items-center gap-1">
          <span className="text-sm leading-5 text-amber-500" aria-hidden="true">
            ★
          </span>
          <span className="text-sm leading-5 text-foreground">{rating}</span>
          {reviewCount && <span className="text-sm leading-5 text-muted-foreground">{reviewCount}</span>}
        </div>
      )}
    </div>
  )
}
