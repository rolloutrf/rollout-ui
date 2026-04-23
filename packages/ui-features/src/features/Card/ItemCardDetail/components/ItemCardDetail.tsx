'use client'

import { Price } from '@features-src/shared/Price/components/Price'

import { ItemCardDetailActions } from './ItemCardDetailActions'
import { ItemCardDetailCompanyInfo } from './ItemCardDetailCompanyInfo'
import { ItemCardDetailCredit } from './ItemCardDetailCredit'
import { ItemCardDetailDescription } from './ItemCardDetailDescription'
import { ItemCardDetailImage } from './ItemCardDetailImage'
import { ItemCardDetailProperties } from './ItemCardDetailProperties'
import { ItemCardDetailReviews } from './ItemCardDetailReviews'
import { ItemCardDetailSelections } from './ItemCardDetailSelections'
import { ItemCardDetailTitle } from './ItemCardDetailTitle'

import type { ItemCardDetailProps } from '../types/ItemCardDetail.types'

export const ItemCardDetail = ({
  imgUrls,
  currentPrice,
  originalPrice,
  priceLocale = 'ru-RU',
  priceCurrency = 'RUB',
  priceSubtitle,
  rating,
  reviewCount,
  reviewUrl,
  reviewsLabel = 'отзывов',
  properties,
  productName,
  maxTitleLength,
  titleDescription,
  colors,
  colorLabel = 'Цвет',
  defaultColor,
  onColorChange,
  volumes,
  volumeLabel = 'Объем',
  defaultVolume,
  onVolumeChange,
  actions,
  creditMonths = [4, 6, 8],
  defaultCreditMonths = 4,
  monthlyPrice,
  creditTitle = 'Оплата в кредит',
  creditSubtitle = 'Начнётся, только когда заказ будет у вас',
  creditDescription = 'Сейчас оплачиваете только доставку',
  creditMonthSuffix = 'мес.',
  creditPerMonthLabel = 'в месяц',
  creditLocale = 'ru-RU',
  creditCurrency = 'RUB',
  onCreditMonthsChange,
  descriptionTabs,
  expandLabel = 'Развернуть',
  collapseLabel = 'Свернуть',
  companyName,
  companyLabel = 'Магазин',
  companyRating,
  companyIcon,
  companyItems,
  className,
}: ItemCardDetailProps) => {
  return (
    <div
      className={`flex flex-col gap-7 items-center w-full max-w-md mx-auto px-0 py-0 overflow-clip ${className || ''}`}
      data-component="item-card-detail"
    >
      <ItemCardDetailImage imgUrls={imgUrls} />

      {currentPrice && (
        <Price
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          locale={priceLocale}
          currency={priceCurrency}
          subtitle={priceSubtitle}
          size="xl"
          className="w-full"
        />
      )}

      {rating && (
        <ItemCardDetailReviews
          rating={rating}
          reviewCount={reviewCount}
          reviewUrl={reviewUrl}
          reviewsLabel={reviewsLabel}
        />
      )}

      <ItemCardDetailProperties properties={properties} />

      <ItemCardDetailTitle
        productName={productName}
        maxTitleLength={maxTitleLength}
        titleDescription={titleDescription}
      />

      {(colors || volumes) && (
        <ItemCardDetailSelections
          colors={colors}
          colorLabel={colorLabel}
          defaultColor={defaultColor}
          onColorChange={onColorChange}
          volumes={volumes}
          volumeLabel={volumeLabel}
          defaultVolume={defaultVolume}
          onVolumeChange={onVolumeChange}
        />
      )}

      <ItemCardDetailActions actions={actions} />

      {monthlyPrice !== undefined && (
        <ItemCardDetailCredit
          creditMonths={creditMonths}
          defaultCreditMonths={defaultCreditMonths}
          monthlyPrice={monthlyPrice}
          creditTitle={creditTitle}
          creditSubtitle={creditSubtitle}
          creditDescription={creditDescription}
          creditMonthSuffix={creditMonthSuffix}
          creditPerMonthLabel={creditPerMonthLabel}
          creditLocale={creditLocale}
          creditCurrency={creditCurrency}
          onCreditMonthsChange={onCreditMonthsChange}
        />
      )}

      <ItemCardDetailDescription tabs={descriptionTabs} expandLabel={expandLabel} collapseLabel={collapseLabel} />

      <ItemCardDetailCompanyInfo
        companyName={companyName}
        companyLabel={companyLabel}
        companyRating={companyRating}
        companyIcon={companyIcon}
        companyItems={companyItems}
      />
    </div>
  )
}
