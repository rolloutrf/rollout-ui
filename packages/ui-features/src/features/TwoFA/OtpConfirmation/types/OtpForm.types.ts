import type { InputOTP, InputOTPSlot } from '@rollout/ui-kit'

export type OtpFormProps = {
  slotsCount: number
  inputOtpProps?: Omit<
    React.ComponentProps<typeof InputOTP>,
    'children' | 'maxLength' | 'value' | 'onChange' | 'render'
  >
  onComplete?: (value: string) => void
  inputOtpSlotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>
}
