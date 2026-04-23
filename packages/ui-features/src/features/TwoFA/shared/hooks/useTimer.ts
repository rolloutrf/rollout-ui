import { useCallback, useEffect, useRef, useState } from 'react'

export type TimerProps = {
  startValueMs: number
  tickMs?: number
  intervalDirection?: 1 | -1
  maxValueMs?: number
  minValueMs?: number
  onStart?: (goalTimeMs: number) => void
  onFinish?: (goalTimeMs: number, finishTimeMs: number) => void
  autoStart?: boolean
}

export const useTimer = ({
  tickMs = 1000,
  startValueMs,
  intervalDirection = -1,
  maxValueMs,
  minValueMs,
  onStart,
  onFinish,
  autoStart = true,
}: TimerProps) => {
  const [time, setTime] = useState(startValueMs)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isRunning, setIsRunning] = useState(autoStart)

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  const tick = useCallback(() => {
    setTime((prevTime) => {
      const nextTime = prevTime + intervalDirection * tickMs
      const isExceeded =
        (maxValueMs !== undefined && nextTime >= maxValueMs) || (minValueMs !== undefined && nextTime <= minValueMs)

      if (isExceeded) {
        clear()
        onFinish?.(startValueMs, nextTime)
      }

      return nextTime
    })
  }, [intervalDirection, tickMs, maxValueMs, minValueMs, onFinish, startValueMs, clear])

  const start = useCallback(() => {
    if (intervalRef.current !== null) return

    intervalRef.current = setInterval(tick, tickMs)
    onStart?.(startValueMs)
  }, [tick, tickMs, onStart, startValueMs])

  const restart = useCallback(() => {
    clear()
    setTime(startValueMs)
    setIsRunning(true)
    start()
  }, [clear, startValueMs, start])

  const stop = useCallback(() => {
    clear()
  }, [clear])

  useEffect(() => {
    if (autoStart) {
      start()
    }
    return clear
  }, [start, clear, autoStart])

  return {
    time,
    restart,
    stop,
    isRunning,
  }
}
