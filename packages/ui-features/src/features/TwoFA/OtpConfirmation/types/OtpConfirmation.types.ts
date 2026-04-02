import type { OtpCodeStatusProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpCodeStatus.types'

export type OtpConfirmationProps = OtpCodeStatusProps & {
  slotsCount: number
  defaultOTPValue?: number | string
  title?: React.ReactNode
  subTitle?: React.ReactNode
  policy?: React.ReactNode
}
