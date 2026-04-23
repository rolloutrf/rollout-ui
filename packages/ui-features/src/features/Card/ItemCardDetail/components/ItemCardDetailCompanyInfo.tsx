import { ChevronRight } from 'lucide-react'

import type { ItemCardDetailCompanyLinkItem } from '@features-src/features/Card/ItemCardDetail/types/ItemCardDetail.types'

type ItemCardDetailCompanyInfoProps = {
  companyName?: React.ReactNode
  companyLabel?: string
  companyRating?: number
  companyIcon?: React.ReactNode
  companyItems?: ItemCardDetailCompanyLinkItem[]
}

const renderCompanyItem = (item: ItemCardDetailCompanyLinkItem) => {
  const content = (
    <>
      <div className="flex flex-1 flex-col gap-1 items-start justify-center min-w-0">
        <p className="text-sm font-medium text-foreground leading-4 text-left w-full truncate">{item.title}</p>
        {item.description && (
          <p className="text-sm leading-5 text-muted-foreground text-ellipsis overflow-hidden text-left w-full">
            {item.description}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </>
  )

  if (item.url) {
    return (
      <a
        key={item.id}
        href={item.url}
        className="flex gap-4 items-start py-4 w-full hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    )
  }

  return (
    <button
      key={item.id}
      type="button"
      onClick={item.onClick}
      className="flex gap-4 items-start py-4 w-full cursor-pointer hover:opacity-80 transition-opacity"
    >
      {content}
    </button>
  )
}

export const ItemCardDetailCompanyInfo = ({
  companyName = 'Shop',
  companyLabel = 'Магазин',
  companyRating = 4.8,
  companyIcon,
  companyItems,
}: ItemCardDetailCompanyInfoProps) => {
  if (!companyName && !companyItems?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 w-full" data-state="company-info-section">
      {companyName && (
        <div className="flex gap-4 items-center py-4 w-full">
          {companyIcon ? (
            companyIcon
          ) : (
            <div className="flex items-center justify-center size-10 bg-cyan-600 rounded-lg text-white font-medium">
              {typeof companyName === 'string' ? companyName[0] : 'S'}
            </div>
          )}

          <div className="flex flex-1 flex-col gap-1 items-start justify-center">
            <p className="text-sm font-medium text-foreground leading-4 text-left">{companyName}</p>
            {companyRating !== undefined && (
              <p className="text-sm leading-5 text-muted-foreground text-ellipsis overflow-hidden text-left w-full truncate">
                {companyLabel} <span style={{ color: '#10B981' }}>{companyRating}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {companyItems?.map((item) => renderCompanyItem(item))}
    </div>
  )
}
