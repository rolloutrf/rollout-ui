'use client'

import { InputOTP, InputOTPDot, InputOTPGroup } from '@rollout/ui-kit'

import { useDotPassword } from '@features-src/features/TwoFA/DotPassword/hooks/useDotPassword'
import type { DotPasswordFormProps } from '@features-src/features/TwoFA/DotPassword/types/DotPasswordForm.types'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const DotPasswordForm = ({
  slotsCount,
  onComplete,
  inputOtpProps,
  inputOtpDotProps,
}: DotPasswordFormProps) => {
  const { value, status, errorText, handleChange } = useDotPassword({ slotsCount, onComplete })

  return (
    <>
      <InputOTP maxLength={slotsCount} value={value} onChange={handleChange} {...inputOtpProps}>
        <div className={'flex space-x-3'}>
          {Array.from({ length: slotsCount }, (_, itemIndex) => (
            <InputOTPGroup key={itemIndex} aria-invalid={status === 'error'}>
              <InputOTPDot index={itemIndex} status={status} {...inputOtpDotProps} />
            </InputOTPGroup>
          ))}
        </div>
      </InputOTP>

      {errorText && <Notice className={'text-error'}>{errorText}</Notice>}
    </>
  )
}
