import { useCallback, useRef, useState } from 'react'

import { useIsMobile } from '@features-src/shared/hooks/useIsMobile'
import type { SliderProps } from '@features-src/shared/Slider'

import type { MouseEvent } from 'react'

export function useSliderScroll({ slideOnMouseMove }: Pick<SliderProps, 'slideOnMouseMove'>) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<Array<HTMLDivElement | null>>([])
  const chosenSlide = useRef<number | undefined>(undefined)
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()

  const setSlideRef = useCallback((index: number, node: HTMLDivElement | null) => {
    slidesRef.current[index] = node
  }, [])

  const onSelectSlide = useCallback(
    (index: number) => {
      if (activeIndex === index) return

      const sliderElement = sliderRef.current
      const slideElement = slidesRef.current[index]

      if (!sliderElement || !slideElement) return

      const left = slideElement.offsetLeft - sliderElement.offsetLeft

      sliderElement.scrollTo({ left, behavior: 'smooth' })
      chosenSlide.current = index
      setActiveIndex(index)
    },
    [activeIndex]
  )

  const onScroll = useCallback(() => {
    const sliderElement = sliderRef.current

    if (!sliderElement) return

    const slideOffsets = slidesRef.current.map((slideElement) => slideElement?.offsetLeft ?? 0)
    const nearestIndex = slideOffsets.reduce((bestIndex, currentOffset, index) => {
      const bestDistance = Math.abs(sliderElement.scrollLeft - slideOffsets[bestIndex])
      const currentDistance = Math.abs(sliderElement.scrollLeft - currentOffset)
      return currentDistance < bestDistance ? index : bestIndex
    }, 0)

    if (chosenSlide.current === nearestIndex) {
      chosenSlide.current = undefined
      return
    }

    if (chosenSlide.current === undefined) {
      setActiveIndex(nearestIndex)
    }
  }, [])

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!slideOnMouseMove || isMobile) return

      const slider = sliderRef.current
      if (!slider) return

      const slidesCount = slidesRef.current.filter(Boolean).length
      if (slidesCount <= 1) return

      const rect = slider.getBoundingClientRect()
      const relativeX = event.clientX - rect.left
      const index = Math.min(Math.floor((relativeX / rect.width) * slidesCount), slidesCount - 1)

      onSelectSlide(index)
    },
    [onSelectSlide, isMobile, slideOnMouseMove]
  )

  return { sliderRef, activeIndex, setSlideRef, onSelectSlide, onScroll, onMouseMove }
}
