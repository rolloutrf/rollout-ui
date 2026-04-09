import type { InputOTP, InputOTPDot } from '@rollout/ui-kit'

export type DotPasswordFormProps = {
  slotsCount: number
  onComplete?: (value: string) => Promise<void>
  inputOtpProps?: Omit<
    React.ComponentProps<typeof InputOTP>,
    'children' | 'maxLength' | 'value' | 'onChange' | 'render'
  >
  inputOtpDotProps?: Omit<React.ComponentProps<typeof InputOTPDot>, 'index' | 'status'>
}
