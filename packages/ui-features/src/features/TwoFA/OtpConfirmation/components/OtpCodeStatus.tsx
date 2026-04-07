'use client'

import React, { useCallback, useState } from 'react'

import { Button } from '@rollout/ui-kit'

import { cn } from '@ui-kit/lib/utils'

import type { OtpCodeStatusProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpCodeStatus.types'
import { useTimer } from '@features-src/features/TwoFA/shared/hooks/useTimer'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'
import { formatMsToTime } from '@features-src/shared/utils/formatMsToHumanTime'

const minValueMs = 0

export const OtpCodeStatus = ({
  onResend,
  resendText,
  getTimerText,
  resendErrorText,
  resetSeconds = 59,
  buttonProps,
}: OtpCodeStatusProps) => {
  const { className: buttonClassName, ...restButtonProps } = buttonProps ?? {}
  const [resendError, setResendError] = useState<React.ReactNode>(undefined)
  const { time, restart, isRunning } = useTimer({
    startValueMs: resetSeconds * 1000,
    minValueMs,
    tickMs: 1000,
  })

  const onInnerResend = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      try {
        await onResend?.()
        setResendError(undefined)
        restart()
      } catch (_error) {
        setResendError(resendErrorText)
      }
    },
    [restart, onResend, resendErrorText]
  )

  if (!isRunning) {
    return (
      <div className={'flex flex-col space-y-2'}>
        <Button
          variant="link"
          className={cn('text-sm p-0 h-auto', buttonClassName)}
          {...restButtonProps}
          onClick={onInnerResend}
        >
          {resendText}
        </Button>
        {resendError && <Notice className={'text-error'}>{resendError}</Notice>}
      </div>
    )
  }

  if (getTimerText === undefined) {
    return formatMsToTime(time)
  }

  return <Notice>{getTimerText?.(formatMsToTime(time, false))}</Notice>
}
