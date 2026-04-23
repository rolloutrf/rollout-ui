import type { ItemCardDetailProps } from '../types'

export const ItemCardDetailProperties = ({ properties }: Pick<ItemCardDetailProps, 'properties'>) => {
  if (!properties?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 w-full" data-state="delivery-section">
      {properties.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-0.5 w-full">
          <div className="flex gap-2 items-center min-w-0">
            {item.icon}
            <p className="text-sm font-medium text-foreground truncate">{item.text}</p>
          </div>
          {item.rightContent && (
            <div className="text-sm text-muted-foreground whitespace-nowrap">{item.rightContent}</div>
          )}
        </div>
      ))}
    </div>
  )
}
