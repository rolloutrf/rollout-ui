import { TypographyH3, TypographyText } from '@rollout/ui-kit'

import type { HeadingProps } from '@features-src/features/TwoFA/shared/types/Heading.types'

export const Heading = ({
  className,
  title,
  titleProps,
  subTitle,
  subTitleProps,
}: HeadingProps) => (
  <div className={className}>
    <TypographyH3 {...titleProps}>{title}</TypographyH3>
    <TypographyText {...subTitleProps}>{subTitle}</TypographyText>
  </div>
)
