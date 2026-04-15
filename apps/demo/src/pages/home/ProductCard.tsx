import { ItemCard } from '@rollout/ui-features'

import { useFavorites } from '@/store/favorites'
import type { Product } from './data'

export function ProductCard({ product: p }: { product: Product }) {
  const { has, toggle } = useFavorites()

  return (
    <ItemCard
      imgUrls={p.imgUrl}
      title={p.title}
      price={p.price}
      originalPrice={p.originalPrice}
      discount={p.discount}
      attributes={p.attributes}
      seller={p.seller}
      rating={p.rating}
      reviewCount={p.reviewCount}
      metaText={p.date}
      buttonText={p.buttonText}
      isFavorite={has(p.id)}
      onFavoriteToggle={() => toggle(p.id)}
    />
  )
}
