import type { ItemCardDetailProps } from '../types'

export const ItemCardDetailProperties = ({ properties }: Pick<ItemCardDetailProps, 'properties'>) => {
  if (!properties?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 w-full" data-state="delivery-section">
      {properties.map(({ id, icon: Icon, text, rightContent }) => (
        <div key={id} className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            {Icon && <Icon />}
            <p className="text-sm font-medium text-foreground truncate">{text}</p>
          </div>
          {rightContent && (
            <div className="text-sm text-muted-foreground whitespace-nowrap">{rightContent}</div>
          )}
        </div>
      ))}
    </div>
  )
}
