import type { ItemCardAttribute } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

interface ItemCardAttributesProps {
  attributes?: ItemCardAttribute[]
}

export function ItemCardAttributes({ attributes }: ItemCardAttributesProps) {
  if (!attributes?.length) return null

  return (
    <div className="flex flex-col gap-0.5">
      {attributes.map((attr, i) => (
        <div key={i} className="flex items-center gap-1 max-w-full overflow-hidden">
          {attr.swatches?.map((c, j) => (
            <div
              key={j}
              className="size-3 rounded-full flex-shrink-0 border border-border/30"
              style={{ backgroundColor: c }}
            />
          ))}
          {attr.Icon && (
            <attr.Icon
              className="size-3.5 flex-shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
          )}
          <span className="text-sm leading-5 text-foreground truncate">{attr.text}</span>
        </div>
      ))}
    </div>
  )
}
