'use client'

import { Children } from 'react'

import { cn } from '@rollout/ui-kit'

import { useSliderScroll } from '@features-src/shared/Slider/hooks/useSliderScroll'
import type { SliderProps } from '@features-src/shared/Slider/types/Slider.types'

import { SliderDots } from './SliderDots'
import { SlideWrap } from './SlideWrap'

export function Slider({ children, className, slideClassName, slideOnMouseMove = true }: SliderProps) {
  const slides = Children.toArray(children)
  const { sliderRef, activeIndex, setSlideRef, onSelectSlide, onScroll, onMouseMove } = useSliderScroll({
    slideOnMouseMove,
  })

  if (!slides.length) return null

  return (
    <div className={cn('flex w-full flex-col items-center gap-2', className)}>
      <div
        ref={sliderRef}
        onScroll={onScroll}
        onMouseMove={onMouseMove}
        className={cn(
          'flex w-full overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card',
          'snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        {slides.map((slide, index) => (
          <SlideWrap
            key={index}
            ref={(node) => setSlideRef(index, node)}
            className={cn('aspect-square', slideClassName)}
          >
            {slide}
          </SlideWrap>
        ))}
      </div>

      <SliderDots slidesCount={slides.length} activeIndex={activeIndex} onSelect={onSelectSlide} />
    </div>
  )
}
