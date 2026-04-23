import { Star } from 'lucide-react'

import { cn } from '@rollout/ui-kit'

import type { ItemCardDetailRatingProps } from '../types/ItemCardDetail.types'

export const ItemCardDetailReviews = ({
  rating,
  reviewCount,
  reviewUrl,
  reviewsLabel = 'отзывов',
}: ItemCardDetailRatingProps) => {
  const reviewsText = reviewCount !== undefined ? `${reviewCount} ${reviewsLabel}` : reviewsLabel
  const titleClassName =
    'flex-1 flex items-center justify-end h-9 px-1.5 py-2.5 text-sm font-medium text-foreground whitespace-nowrap'

  return (
    <div className="flex gap-0 items-center w-full" data-state="reviews-section">
      <div className="flex-1 flex gap-2 items-center h-9 px-1.5 py-2.5">
        <Star className="size-4 text-base-chart fill-base-chart" />
        <span className="text-sm font-medium whitespace-nowrap text-base-chart">{rating}</span>
      </div>

      {reviewUrl ? (
        <a className={cn(titleClassName, 'hover:underline')} href={reviewUrl}>
          {reviewsText}
        </a>
      ) : (
        <span className={titleClassName}>{reviewsText}</span>
      )}
    </div>
  )
}
