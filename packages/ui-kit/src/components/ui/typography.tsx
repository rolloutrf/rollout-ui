import { cn } from '@ui-kit/lib/utils'

import type { JSX } from 'react'

export type TypographyProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T
} & JSX.IntrinsicElements[T]

const TypographyText = ({
  as: Component = 'div',
  children,
  className,
  ...rest
}: TypographyProps) => {
  return (
    <Component className={cn(className)} {...rest}>
      {children}
    </Component>
  )
}

const TypographyH3 = ({ as: Component = 'div', children, className, ...rest }: TypographyProps) => {
  return (
    <Component
      className={cn(className, 'scroll-m-20 text-2xl font-semibold tracking-tight')}
      {...rest}
    >
      {children}
    </Component>
  )
}

export { TypographyText, TypographyH3 }
