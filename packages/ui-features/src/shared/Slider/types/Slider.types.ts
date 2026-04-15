export type SliderProps = {
  children?: React.ReactNode
  className?: string
  slideClassName?: string
  slideOnMouseMove?: boolean
}

export type SliderSlideProps = {
  children: React.ReactNode
  className?: string
}

export type SliderDotsProps = {
  slidesCount: number
  activeIndex: number
  onSelect: (index: number) => void
}
