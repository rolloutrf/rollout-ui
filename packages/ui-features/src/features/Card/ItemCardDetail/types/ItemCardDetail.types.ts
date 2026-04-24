import type { Button } from '@rollout/ui-kit'

export type ItemCardDetailColorOption = {
  label: string
  value: string
  colorHex?: string
}

export type ItemCardDetailVolumeOption = {
  label: string
  value: string
  suffix?: string
}

export type ItemCardDetailAction = {
  id: string
  text?: string
  content?: React.ReactNode
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
}

export type ItemCardDetailPropertyItem = {
  id: string
  icon?: React.ElementType
  text: React.ReactNode
  rightContent?: React.ReactNode
}

export type ItemCardDetailDescriptionTab = {
  id: string
  label: string
  shortText: React.ReactNode
  detailedText?: React.ReactNode
}

export type ItemCardDetailCompanyLinkItem = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  url?: string
  onClick?: () => void
}

export type ItemCardDetailImgProps = {
  imgUrls?: string[]
}

export type ItemCardDetailPriceProps = {
  currentPrice?: number
  originalPrice?: number
  priceLocale?: string
  priceCurrency?: string
  priceSubtitle?: React.ReactNode
}

export type ItemCardDetailRatingProps = {
  rating?: number
  reviewCount?: number
  reviewUrl?: string
  reviewsLabel?: string
}

export type ItemCardDetailCreditProps = {
  creditMonths?: number[]
  defaultCreditMonths?: number
  monthlyPrice?: number
  creditTitle?: React.ReactNode
  creditSubtitle?: React.ReactNode
  creditDescription?: React.ReactNode
  creditMonthSuffix?: string
  creditPerMonthLabel?: string
  onCreditMonthsChange?: (months: number) => void
}

export type ItemCardDetailProps = ItemCardDetailImgProps &
  ItemCardDetailPriceProps &
  ItemCardDetailRatingProps &
  ItemCardDetailCreditProps & {
    properties?: ItemCardDetailPropertyItem[]

    productName: string
    maxTitleLength?: number
    titleDescription?: React.ReactNode

    colors?: ItemCardDetailColorOption[]
    colorLabel?: React.ReactNode
    defaultColor?: string
    onColorChange?: (color: string) => void

    volumes?: ItemCardDetailVolumeOption[]
    volumeLabel?: React.ReactNode
    defaultVolume?: string
    onVolumeChange?: (volume: string) => void

    actions?: ItemCardDetailAction[]

    descriptionTabs?: ItemCardDetailDescriptionTab[]
    expandLabel?: string
    collapseLabel?: string

    companyName?: React.ReactNode
    companyLabel?: string
    companyRating?: number
    companyIcon?: React.ReactNode
    companyItems?: ItemCardDetailCompanyLinkItem[]

    className?: string
  }
