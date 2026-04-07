'use client'

import { useMemo, useState } from 'react'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@rollout/ui-kit'

import type { OtpFormProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpForm.types'

export const OtpForm = ({
  slotsCount,
  defaultOTPValue = '',
  inputOtpProps,
  inputOtpSlotProps,
}: OtpFormProps) => {
  const [value, setValue] = useState<string>(defaultOTPValue.toString())
  const items = useMemo(() => [...Array(slotsCount)].map((_, index) => index), [slotsCount])

  return (
    <InputOTP maxLength={slotsCount} value={value} onChange={setValue} {...inputOtpProps}>
      <div className={'flex space-x-2'}>
        {items.map((itemIndex) => (
          <InputOTPGroup key={itemIndex}>
            <InputOTPSlot index={itemIndex} {...inputOtpSlotProps} />
          </InputOTPGroup>
        ))}
      </div>
    </InputOTP>
  )
}

