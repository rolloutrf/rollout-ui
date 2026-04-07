import type { Button } from '@rollout/ui-kit'

export type OtpCodeStatusProps = {
  onResend?: () => Promise<void>
  getTimerText?: (time: string) => React.ReactNode
  resendText?: React.ReactNode
  resendErrorText?: React.ReactNode
  resetSeconds?: number
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>
}
