'use client'

import { Button } from '@rollout/ui-kit'

import { cn } from '@ui-kit/lib/utils'

import { useOtpCodeStatus } from '@features-src/features/TwoFA/OtpConfirmation/hooks/useOtpCodeStatus'
import type { OtpTimerProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpTimer.types'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const OtpTimer = ({
  onResend,
  resendText,
  getTimerText,
  resetSeconds,
  resendButtonProps,
}: OtpTimerProps) => {
  const { className: resendButtonClassName, ...restResendButtonProps } = resendButtonProps ?? {}

  const { timerText, isRunning, handleResend } = useOtpCodeStatus({
    onResend,
    resetSeconds,
  })

  if (isRunning) {
    return <Notice>{getTimerText ? getTimerText(timerText) : timerText}</Notice>
  }

  return (
    <Button
      variant="link"
      className={cn('text-sm p-0 justify-start h-auto cursor-pointer underline', resendButtonClassName)}
      {...restResendButtonProps}
      onClick={handleResend}
    >
      {resendText}
    </Button>
  )
}
