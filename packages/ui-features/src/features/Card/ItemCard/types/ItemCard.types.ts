import type { LucideIcon } from 'lucide-react'

import type { Button } from '@rollout/ui-kit'

export type ItemCardAttribute = {
  Icon?: LucideIcon
  swatches?: string[]
  text: string
}

export type ItemCardProps = {
  imgUrl: string
  title: string
  price: string
  originalPrice?: string
  discount?: string
  attributes?: ItemCardAttribute[]
  seller?: string
  rating?: string
  reviewCount?: string
  metaText?: React.ReactNode
  buttonText: string
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
  favoriteButtonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>
}

