import type { Button } from '@rollout/ui-kit'

type ItemCardAttributeBase = {
  label: string
}

type ItemCardAttributeIcon = ItemCardAttributeBase & {
  type: 'icon'
  icon: React.ElementType
}

type ItemCardAttributeColor = ItemCardAttributeBase & {
  type: 'color'
  colors: string[]
}

type ItemCardAttributeComponent = ItemCardAttributeBase & {
  type: 'component'
  content: React.ReactNode
}

export type ItemCardAttribute =
  | ItemCardAttributeIcon
  | ItemCardAttributeColor
  | ItemCardAttributeComponent

export type ItemCardProps = {
  imgUrls?: string[]
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
