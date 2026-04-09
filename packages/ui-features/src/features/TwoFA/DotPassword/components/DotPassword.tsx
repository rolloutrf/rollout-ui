import { DotPasswordForm } from '@features-src/features/TwoFA/DotPassword/components/DotPasswordForm'
import type { DotPasswordProps } from '@features-src/features/TwoFA/DotPassword/types/DotPassword.types'
import { Heading } from '@features-src/features/TwoFA/shared/ui/Heading'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const DotPassword = ({
  slotsCount,
  title = 'Повторите пароль',
  subTitle = 'Тот же, который используете при входе\u00A0в баланс для покупок',
  policy,
  onComplete,
  inputOtpProps,
  inputOtpDotProps,
}: DotPasswordProps) => {
  return (
    <div className={'flex flex-col items-center space-y-7'}>
      <Heading className={'text-center'} subTitle={subTitle} title={title} />
      <DotPasswordForm
        slotsCount={slotsCount}
        onComplete={onComplete}
        inputOtpProps={inputOtpProps}
        inputOtpDotProps={inputOtpDotProps}
      />
      {policy && <Notice>{policy}</Notice>}
    </div>
  )
}
