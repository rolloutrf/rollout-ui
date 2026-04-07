'use client'

import { useCallback, useMemo, useState } from 'react'

import { InputOTP, InputOTPDot, InputOTPGroup } from '@rollout/ui-kit'

import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'
import type { DotPasswordFormProps } from '@features-src/features/TwoFA/DotPassword/types/DotPasswordForm.types'

type DotStatus = 'idle' | 'success' | 'error'


export const DotPasswordForm = ({
  slotsCount,
  defaultValue = '',
  onComplete,
  inputOtpProps,
  inputOtpDotProps,
}: DotPasswordFormProps) => {
  const [value, setValue] = useState<string>(defaultValue.toString())
  const [status, setStatus] = useState<DotStatus>('idle')
  const [errorText, setErrorText] = useState<React.ReactNode>(null)

  const items = useMemo(() => [...Array(slotsCount)].map((_, index) => index), [slotsCount])

  const handleChange = useCallback(
    async (nextValue: string) => {
      setValue(nextValue)
      setStatus('idle')
      setErrorText(null)

      if (nextValue.length === slotsCount && onComplete) {
        try {
          await onComplete(nextValue)
          setStatus('success')
        } catch (error) {
          setStatus('error')
          setErrorText(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    },
    [slotsCount, onComplete]
  )

  return (
    <>
      <InputOTP maxLength={slotsCount} value={value} onChange={handleChange} {...inputOtpProps}>
        <div className={'flex space-x-2'}>
          {items.map((itemIndex) => (
            <InputOTPGroup key={itemIndex}>
              <InputOTPDot index={itemIndex} status={status} {...inputOtpDotProps} />
            </InputOTPGroup>
          ))}
        </div>
      </InputOTP>

      {errorText && <Notice className={'text-error'}>{errorText}</Notice>}
    </>
  )
}

