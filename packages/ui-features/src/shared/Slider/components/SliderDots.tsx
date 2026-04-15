import { cn } from '@rollout/ui-kit'

import type { SliderDotsProps } from '@features-src/shared/Slider/types/Slider.types'

export function SliderDots({ slidesCount, activeIndex, onSelect }: SliderDotsProps) {
  if (slidesCount <= 1) return null

  return (
    <div className="flex items-center gap-0.5" aria-label="Навигация по слайдам" role="navigation">
      {Array.from({ length: slidesCount }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Slide ${index}`}
          aria-current={index === activeIndex}
          onClick={() => onSelect(index)}
          className={cn(
            'rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            index === activeIndex ? 'h-1.25 w-1.25 bg-secondary-foreground' : 'h-1 w-1 bg-muted'
          )}
        />
      ))}
    </div>
  )
}
