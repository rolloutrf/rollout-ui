import type { Input } from '@rollout/ui-kit'

import type { PhoneMaskConfig } from '@features-src/features/TwoFA/PhoneEntry/constants/phoneMasks'

export type PhoneMaskedInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  mask: PhoneMaskConfig
  onValueChange?: (value: string) => void
}

