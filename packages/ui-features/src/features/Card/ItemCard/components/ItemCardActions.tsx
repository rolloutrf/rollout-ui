import { Heart } from 'lucide-react'

import { Button } from '@rollout/ui-kit'

import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

type ItemCardActionsProps = Pick<
  ItemCardProps,
  'buttonText' | 'isFavorite' | 'onFavoriteToggle' | 'buttonProps' | 'favoriteButtonProps'
>

export function ItemCardActions({
  buttonText,
  isFavorite,
  onFavoriteToggle,
  buttonProps,
  favoriteButtonProps,
}: ItemCardActionsProps) {
  return (
    <div className="flex gap-2">
      <div className="w-full">
        <Button variant="default" size="lg" className="w-full" {...buttonProps}>
          {buttonText}
        </Button>
      </div>
      <Button
        variant="secondary"
        size="icon-lg"
        aria-label="Добавить в избранное"
        {...favoriteButtonProps}
        onClick={onFavoriteToggle}
      >
        <Heart
          className="size-4"
          fill={isFavorite ? 'currentColor' : 'none'}
          strokeWidth={isFavorite ? 0 : 1.5}
          style={{ color: isFavorite ? 'hsl(var(--destructive))' : undefined }}
          aria-hidden="true"
        />
      </Button>
    </div>
  )
}
