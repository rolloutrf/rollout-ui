import { forwardRef } from 'react'

import { cn } from '@rollout/ui-kit'

import type { SliderSlideProps } from '@features-src/shared/Slider/types/Slider.types'

export const SlideWrap = forwardRef<HTMLDivElement, SliderSlideProps>((
  { children, className },
  ref
) => {
  return (
    <div ref={ref} className={cn('w-full shrink-0 snap-always snap-start overflow-hidden', className)}>
      {children}
    </div>
  )
})
