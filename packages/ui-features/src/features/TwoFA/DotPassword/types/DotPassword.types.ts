import type { InputOTP, InputOTPDot } from '@rollout/ui-kit'

export type DotPasswordProps = {
  slotsCount: number
  title?: React.ReactNode
  subTitle?: React.ReactNode
  policy?: React.ReactNode
  onComplete?: (value: string) => Promise<void>
  inputOtpProps?: Omit<
    React.ComponentProps<typeof InputOTP>,
    'children' | 'maxLength' | 'value' | 'onChange' | 'render'
  >
  inputOtpDotProps?: Omit<React.ComponentProps<typeof InputOTPDot>, 'index' | 'status'>
}
