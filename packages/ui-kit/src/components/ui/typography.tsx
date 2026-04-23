import { cn } from '@ui-kit/lib/utils'

import type { JSX } from 'react'

export type TypographyProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T
} & JSX.IntrinsicElements[T]

const TypographyText = ({ as: component = 'div', children, className, ...rest }: TypographyProps) => {
  const Component = component

  return (
    <Component className={cn(className)} {...rest}>
      {children}
    </Component>
  )
}

const TypographyH3 = ({ as: component = 'div', children, className, ...rest }: TypographyProps) => {
  const Component = component

  return (
    <Component className={cn(className, 'scroll-m-20 text-2xl font-semibold tracking-tight')} {...rest}>
      {children}
    </Component>
  )
}

export { TypographyText, TypographyH3 }
