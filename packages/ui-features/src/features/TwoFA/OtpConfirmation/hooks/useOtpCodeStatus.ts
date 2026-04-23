import { useCallback } from 'react'

import { useTimer } from '@features-src/features/TwoFA/shared/hooks/useTimer'
import { formatMsToTime } from '@features-src/shared/utils/formatMsToHumanTime'

import type { MouseEvent } from 'react'

const MIN_VALUE_MS = 0

type UseOtpCodeStatusProps = {
  onResend?: () => void | Promise<void>
  resetSeconds?: number
}

type UseOtpCodeStatusReturn = {
  timerText: string
  isRunning: boolean
  handleResend: (e: MouseEvent) => Promise<void>
}

export const useOtpCodeStatus = ({ onResend, resetSeconds = 59 }: UseOtpCodeStatusProps): UseOtpCodeStatusReturn => {
  const {
    time,
    restart: restartTimer,
    isRunning,
  } = useTimer({
    startValueMs: resetSeconds * 1000,
    minValueMs: MIN_VALUE_MS,
    tickMs: 1000,
  })

  const handleResend = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault()
      await onResend?.()
      restartTimer()
    },
    [restartTimer, onResend]
  )

  const timerText = formatMsToTime(time, false)

  return {
    timerText,
    isRunning,
    handleResend,
  }
}
