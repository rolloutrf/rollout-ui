import { Button } from '@rollout/ui-kit'

import { cn } from '@ui-kit/lib/utils'

import { OtpForm } from '@features-src/features/TwoFA/OtpConfirmation/components/OtpForm'
import { OtpTimer } from '@features-src/features/TwoFA/OtpConfirmation/components/OtpTimer'
import type { OtpConfirmationProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpConfirmation.types'
import { Heading } from '@features-src/features/TwoFA/shared/ui/Heading'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const OtpConfirmation = ({
  slotsCount,
  title = 'Подтвердите телефон и платите кошельком',
  subTitle = 'Введите код из смс, мы отправили его на номер +7 999 999-99-99',
  policy,
  onResend,
  onChangePhone,
  resendText = 'Отправить заново',
  errorText,
  changePhoneText = 'Изменить номер',
  getTimerText = (time) => `Отправить повторно можно через ${time} c.`,
  resetSeconds,
  resendButtonProps,
  changePhoneButtonProps,
  inputOtpProps,
  inputOtpSlotProps,
}: OtpConfirmationProps) => {
  return (
    <div className={'flex flex-col space-y-7'}>
      <Heading subTitle={subTitle} title={title} />
      <div className={'flex flex-col space-y-2'}>
        <OtpForm
          slotsCount={slotsCount}
          inputOtpProps={inputOtpProps}
          inputOtpSlotProps={inputOtpSlotProps}
        />
        <Notice className={'text-error'}>{errorText}</Notice>
      </div>
      <div className={'flex flex-col space-y-4'}>
        <OtpTimer
          onResend={onResend}
          resendText={resendText}
          getTimerText={getTimerText}
          resetSeconds={resetSeconds}
          resendButtonProps={resendButtonProps}
        />
        <Button
          variant="link"
          {...changePhoneButtonProps}
          className={cn('text-sm p-0 justify-start h-auto cursor-pointer underline', changePhoneButtonProps?.className)}
          onClick={onChangePhone}
        >
          {changePhoneText}
        </Button>
      </div>
      <Notice>{policy}</Notice>
    </div>
  )
}
