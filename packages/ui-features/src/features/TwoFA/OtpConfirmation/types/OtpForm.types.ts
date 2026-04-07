import type { InputOTP, InputOTPSlot } from '@rollout/ui-kit'

export type OtpFormProps = {
  slotsCount: number
  defaultOTPValue?: number | string
  inputOtpProps?: Omit<
    React.ComponentProps<typeof InputOTP>,
    'children' | 'maxLength' | 'value' | 'onChange' | 'render'
  >
  inputOtpSlotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>
}

