import { Slider } from '@features-src/shared/Slider'

import type { ItemCardDetailImgProps } from '../types/ItemCardDetail.types'

export function ItemCardDetailImage({ imgUrls }: ItemCardDetailImgProps) {
  if (!imgUrls?.length) {
    return null
  }

  return (
    <Slider showDots>
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
