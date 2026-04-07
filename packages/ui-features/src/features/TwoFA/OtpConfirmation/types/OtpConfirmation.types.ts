import type { InputOTP, InputOTPSlot } from '@rollout/ui-kit'

import type { OtpCodeStatusProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpCodeStatus.types'

export type OtpConfirmationProps = OtpCodeStatusProps & {
  slotsCount: number
  defaultOTPValue?: number | string
  title?: React.ReactNode
  subTitle?: React.ReactNode
  policy?: React.ReactNode
  inputOtpProps?: Omit<React.ComponentProps<typeof InputOTP>, 'children' | 'maxLength' | 'value' | 'onChange' | 'render'>
  inputOtpSlotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>
}
