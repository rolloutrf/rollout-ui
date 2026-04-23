import type { ItemCardDetailProps } from '../types'

export const ItemCardDetailTitle = ({
  productName,
  maxTitleLength = 120,
  titleDescription,
}: Pick<ItemCardDetailProps, 'productName' | 'maxTitleLength' | 'titleDescription'>) => {
  const truncatedTitle =
    productName.length > maxTitleLength ? `${productName.slice(0, maxTitleLength).trim()}...` : productName

  return (
    <div className="w-full flex flex-col gap-2" data-state="product-title">
      <div className="text-xl font-bold leading-7 text-foreground truncate" title={productName}>
        {truncatedTitle}
      </div>
      {titleDescription && <div className="text-sm leading-5 text-muted-foreground">{titleDescription}</div>}
    </div>
  )
}
