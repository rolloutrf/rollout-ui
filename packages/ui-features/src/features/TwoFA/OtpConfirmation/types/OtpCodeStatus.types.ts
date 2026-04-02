export type OtpCodeStatusProps = {
  onResend?: () => Promise<void>
  getTimerText?: (time: string) => React.ReactNode
  resendText?: React.ReactNode
  resendErrorText?: React.ReactNode
  resetSeconds?: number
}
