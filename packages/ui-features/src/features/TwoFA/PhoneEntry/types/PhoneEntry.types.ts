import type { Button, Field } from '@rollout/ui-kit'

import type { PhoneMaskConfig } from '@features-src/features/TwoFA/PhoneEntry/constants/phoneMasks'
import type { PhoneMaskedInputProps } from '@features-src/features/TwoFA/PhoneEntry/types/PhoneMaskedInput.types'

import type React from 'react'

export type PhoneEntryProps = {
  policy?: React.ReactNode
  title?: string
  subTitle?: string
  buttonText?: React.ReactNode
  inputName?: string
  phoneMask?: PhoneMaskConfig
  onPhoneChange?: (value: string) => void
  fieldProps?: React.ComponentProps<typeof Field>
  inputProps?: Omit<PhoneMaskedInputProps, 'mask' | 'onValueChange'>
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
}
