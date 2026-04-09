'use client'

import { Input } from '@rollout/ui-kit'

import { usePhoneMask } from '@features-src/features/TwoFA/PhoneEntry/hooks/usePhoneMask'
import type { PhoneMaskedInputProps } from '@features-src/features/TwoFA/PhoneEntry/types/PhoneMaskedInput.types'

export const PhoneMaskedInput = ({
  mask,
  onValueChange,
  ...inputProps
}: PhoneMaskedInputProps) => {
  const { value, onChange, onFocus, placeholder } = usePhoneMask(mask)
  const { onFocus: onInputFocus, ...restInputProps } = inputProps

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = onChange(event)

    onValueChange?.(maskedValue)
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const maskedValue = onFocus()

    onValueChange?.(maskedValue)
    onInputFocus?.(event)
  }

  return (
    <Input
      type="tel"
      inputMode="numeric"
      placeholder={placeholder}
      aria-label="Phone number"
      value={value}
      onChange={handleChange}
      {...restInputProps}
      onFocus={handleFocus}
    />
  )
}
