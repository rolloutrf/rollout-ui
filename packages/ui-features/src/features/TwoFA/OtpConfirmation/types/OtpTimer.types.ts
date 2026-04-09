import type { OtpConfirmationProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpConfirmation.types'

export type OtpTimerProps = Pick<
  OtpConfirmationProps,
  'onResend' | 'resendText' | 'getTimerText' | 'resetSeconds' | 'resendButtonProps'
>

