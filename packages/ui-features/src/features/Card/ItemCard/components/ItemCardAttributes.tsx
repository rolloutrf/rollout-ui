import type { ItemCardAttribute } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

type ItemCardAttributesProps = {
  attributes?: ItemCardAttribute[]
}

const CardAttribute = ({ label, ...attribute }: ItemCardAttribute) => {
  const Icon = attribute.type === 'icon' ? attribute.icon : null

  return (
    <div className="flex items-center gap-1 max-w-full overflow-hidden">
      {attribute.type === 'color' &&
        attribute.colors.map((color, index) => (
          <div
            key={`${color}-${index}`}
            className="size-3 rounded-full shrink-0 border border-border/30"
            style={{ backgroundColor: color }}
          />
        ))}
      {attribute.type === 'component' && attribute.content}
      {Icon && <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
      <span className="text-sm leading-5 text-foreground truncate">{label}</span>
    </div>
  )
}

export const ItemCardAttributes = ({ attributes }: ItemCardAttributesProps) => {
  if (!attributes?.length) return null

  return (
    <div className="flex flex-col gap-0.5">
      {attributes.map((attr, index) => (
        <CardAttribute key={`${attr.type}-${attr.label}-${index}`} {...attr} />
      ))}
    </div>
  )
}
