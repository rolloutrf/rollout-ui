import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'
import { Price } from '@features-src/shared/Price'

type ItemCardPriceProps = Pick<ItemCardProps, 'price' | 'originalPrice' | 'priceLocale' | 'priceCurrency'>

export const ItemCardPrice = ({ price, originalPrice, priceLocale, priceCurrency }: ItemCardPriceProps) => {
  return (
    <Price currentPrice={price} originalPrice={originalPrice} locale={priceLocale} currency={priceCurrency} size="md" />
  )
}
