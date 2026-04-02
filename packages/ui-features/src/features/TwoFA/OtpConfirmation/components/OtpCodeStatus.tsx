'use client'

import React, { useCallback, useState } from 'react'

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
}: OtpCodeStatusProps) => {
  const { time, restart, isRunning } = useTimer({ startValueMs: 10_000, minValueMs, tickMs: 1000 })
  const [resendError, setResendError] = useState<React.ReactNode>(undefined)

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
        <a className={'text-sm underline cursor-pointer'} onClick={onInnerResend}>
          {resendText}
        </a>
        {resendError && <Notice className={'text-red-500'}>{resendError}</Notice>}
      </div>
    )
  }

  return <Notice>{getTimerText(formatMsToTime(time, false))}</Notice>
}
