import { useState } from 'react'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@rollout/ui-kit'

import { OtpCodeStatus } from '@features-src/features/TwoFA/OtpConfirmation/components/OtpCodeStatus'
import type { OtpConfirmationProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpConfirmation.types'
import { Heading } from '@features-src/features/TwoFA/shared/ui/Heading'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const OtpConfirmation = ({
  slotsCount,
  defaultOTPValue = '',
  title = 'Подтвердите телефон и платите кошельком',
  subTitle = 'Введите код из смс, мы отправили его на номер +7 999 999-99-99',
  policy = 'Вводя код вы соглашаетесь с офертой банка',
  resendText = 'Отправить заново',
  resendErrorText = 'Произошла ошибка при отправки кода. Попробуйте позже.',
  getTimerText = (time) => `Отправить повторно можно через ${time} c.`,
}: OtpConfirmationProps) => {
  const [value, setValue] = useState<string>(defaultOTPValue.toString())
  const [items] = useState<number[]>([...Array(slotsCount)].map((_, index) => index))

  return (
    <div className={'flex flex-col space-y-7'}>
      <Heading subTitle={subTitle} title={title} />
      <div className={'flex flex-col space-y-2'}>
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <div className={'flex space-x-2'}>
            {items.map((itemIndex) => (
              <InputOTPGroup key={itemIndex}>
                <InputOTPSlot index={itemIndex} />
              </InputOTPGroup>
            ))}
          </div>
        </InputOTP>
        <OtpCodeStatus
          resendText={resendText}
          resendErrorText={resendErrorText}
          getTimerText={getTimerText}
        />
      </div>
      <Notice>{policy}</Notice>
    </div>
  )
}
