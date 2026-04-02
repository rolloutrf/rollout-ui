import React, { useCallback, useState } from 'react'

import { InputOTP, InputOTPDot, InputOTPGroup } from '@rollout/ui-kit'

import type { DotPasswordProps } from '@features-src/features/TwoFA/DotPassword/types/DotPassword.types'
import { Heading } from '@features-src/features/TwoFA/shared/ui/Heading'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

type DotStatus = 'idle' | 'success' | 'error'

export const DotPassword = ({
  slotsCount,
  defaultValue = '',
  title = 'Повторите пароль',
  subTitle = 'Тот же, который используете при входе\u00A0в баланс для покупок',
  policy,
  onComplete,
}: DotPasswordProps) => {
  const [value, setValue] = useState<string>(defaultValue.toString())
  const [items] = useState<number[]>([...Array(slotsCount)].map((_, index) => index))
  const [status, setStatus] = useState<DotStatus>('idle')
  const [errorText, setErrorText] = useState<React.ReactNode>(null)

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
    <div className={'flex flex-col items-center space-y-7'}>
      <Heading className={'text-center'} subTitle={subTitle} title={title} />

      <InputOTP maxLength={slotsCount} value={value} onChange={handleChange}>
        <div className={'flex space-x-2'}>
          {items.map((itemIndex) => (
            <InputOTPGroup key={itemIndex}>
              <InputOTPDot index={itemIndex} status={status} />
            </InputOTPGroup>
          ))}
        </div>
      </InputOTP>

      {errorText && <Notice className={'text-red-500'}>{errorText}</Notice>}
      {policy && <Notice>{policy}</Notice>}
    </div>
  )
}
