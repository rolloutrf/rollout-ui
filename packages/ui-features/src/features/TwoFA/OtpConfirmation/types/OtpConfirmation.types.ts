import type { Button, InputOTP, InputOTPSlot } from '@rollout/ui-kit'

export type OtpConfirmationChangePhoneProps = {
  onChangePhone?: () => void | Promise<void>
  changePhoneText?: React.ReactNode
  changePhoneButtonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>
}

export type OtpConfirmationProps = OtpConfirmationChangePhoneProps & {
  onResend?: () => void | Promise<void>
  getTimerText?: (time: string) => React.ReactNode
  resendText?: React.ReactNode
  errorText?: React.ReactNode
  resetSeconds?: number
  resendButtonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>
  slotsCount: number
  title?: React.ReactNode
  subTitle?: React.ReactNode
  policy?: React.ReactNode
  inputOtpProps?: Omit<
    React.ComponentProps<typeof InputOTP>,
    'children' | 'maxLength' | 'value' | 'onChange' | 'render'
  >
  inputOtpSlotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>
}
