import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

import { ItemCardActions } from './ItemCardActions'
import { ItemCardAttributes } from './ItemCardAttributes'
import { ItemCardImage } from './ItemCardImage'
import { ItemCardPrice } from './ItemCardPrice'
import { ItemCardSeller } from './ItemCardSeller'

export function ItemCard({
  imgUrl,
  title,
  price,
  originalPrice,
  discount,
  attributes,
  seller,
  rating,
  reviewCount,
  metaText,
  buttonText,
  isFavorite,
  onFavoriteToggle,
  buttonProps,
  favoriteButtonProps,
}: ItemCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <ItemCardImage imgUrl={imgUrl} title={title} />

      <div className="flex flex-col gap-2 px-1">
        <p className="text-base font-normal leading-6 text-foreground line-clamp-2">{title}</p>

        <ItemCardPrice price={price} originalPrice={originalPrice} discount={discount} />

        <ItemCardAttributes attributes={attributes} />

        <ItemCardSeller seller={seller} rating={rating} reviewCount={reviewCount} />

        {metaText && <p className="text-sm leading-5 text-muted-foreground truncate">{metaText}</p>}

        <ItemCardActions
          buttonText={buttonText}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
          buttonProps={buttonProps}
          favoriteButtonProps={favoriteButtonProps}
        />
      </div>
    </div>
  )
}

