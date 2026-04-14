import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

type ItemCardImageProps = Pick<ItemCardProps, 'imgUrl' | 'title'>

export function ItemCardImage({ imgUrl, title }: ItemCardImageProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center w-full">
      <div className="aspect-square bg-card border border-border rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden w-full">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex gap-0.5 items-center">
        <div className="w-1 h-1 rounded-full bg-foreground" />
        <div className="w-0.75 h-0.75 rounded-full bg-border" />
        <div className="w-0.75 h-0.75 rounded-full bg-border" />
      </div>
    </div>
  )
}

