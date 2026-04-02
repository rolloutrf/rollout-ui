export type OtpConfirmationProps = {
  slotsCount: number
  defaultOTPValue?: number | string
  title?: React.ReactNode
  subTitle?: React.ReactNode
  policy?: React.ReactNode
  resendText?: React.ReactNode
  resendErrorText?: React.ReactNode
  getTimerText?: (time: string) => React.ReactNode
}
