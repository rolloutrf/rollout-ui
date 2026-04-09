'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@rollout/ui-kit'

import { useOtpCodeState } from '@features-src/features/TwoFA/OtpConfirmation/hooks/useOtpCodeState'
import type { OtpFormProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpForm.types'

export const OtpForm = ({
  slotsCount,
  onComplete,
  inputOtpProps,
  inputOtpSlotProps,
}: OtpFormProps) => {
  const [value, setValue] = useOtpCodeState(slotsCount, onComplete)

  return (
    <InputOTP autoComplete="one-time-code"  maxLength={slotsCount} value={value} onChange={setValue} {...inputOtpProps}>
      <div className={'flex space-x-2'}>
        {Array.from({ length: slotsCount }, (_, itemIndex) => (
          <InputOTPGroup key={itemIndex}>
            <InputOTPSlot index={itemIndex} {...inputOtpSlotProps} />
          </InputOTPGroup>
        ))}
      </div>
    </InputOTP>
  )
}
