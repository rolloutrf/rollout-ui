import type { ItemCardProps } from '@features-src/features/Card/ItemCard/types/ItemCard.types'

import { Slider } from '@features-src/shared/Slider'

type ItemCardImageProps = Pick<ItemCardProps, 'imgUrls'>

export function ItemCardImage({ imgUrls }: ItemCardImageProps) {
  if (!imgUrls?.length) {
    return null
  }

  return (
    <Slider>
      {imgUrls.map((src, index) => (
        <figure key={index} className="h-full w-full">
          <img
            src={src}
            alt={`gallery image ${index}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}
    </Slider>
  )
}
