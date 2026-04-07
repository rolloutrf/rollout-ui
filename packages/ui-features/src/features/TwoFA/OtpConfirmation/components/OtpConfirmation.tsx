import { OtpCodeStatus } from '@features-src/features/TwoFA/OtpConfirmation/components/OtpCodeStatus'
import { OtpForm } from '@features-src/features/TwoFA/OtpConfirmation/components/OtpForm'
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
  buttonProps,
  inputOtpProps,
  inputOtpSlotProps,
}: OtpConfirmationProps) => {
  return (
    <div className={'flex flex-col space-y-7'}>
      <Heading subTitle={subTitle} title={title} />
      <div className={'flex flex-col space-y-2'}>
        <OtpForm
          slotsCount={slotsCount}
          defaultOTPValue={defaultOTPValue}
          inputOtpProps={inputOtpProps}
          inputOtpSlotProps={inputOtpSlotProps}
        />
        <OtpCodeStatus
          resendText={resendText}
          resendErrorText={resendErrorText}
          getTimerText={getTimerText}
          buttonProps={buttonProps}
        />
      </div>
      <Notice>{policy}</Notice>
    </div>
  )
}
