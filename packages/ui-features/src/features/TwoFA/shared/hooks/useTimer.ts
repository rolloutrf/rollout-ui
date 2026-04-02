import { useCallback, useEffect, useRef, useState } from 'react'

export type TimerProps = {
  startValueMs: number
  tickMs?: number
  intervalDirection?: 1 | -1
  maxValueMs?: number
  minValueMs?: number
  onStart?: (goalTimeMs: number) => void
  onFinish?: (goalTimeMs: number, finishTimeMs: number) => void
}

export const useTimer = ({
  tickMs = 1000,
  startValueMs,
  intervalDirection = -1,
  maxValueMs,
  minValueMs,
  onStart,
  onFinish,
}: TimerProps) => {
  const [time, setTime] = useState(startValueMs)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isRunning, setIsRunning] = useState(true)

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
        (maxValueMs !== undefined && nextTime >= maxValueMs) ||
        (minValueMs !== undefined && nextTime <= minValueMs)

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
    start()
    setIsRunning(true)
  }, [clear, startValueMs, start])

  const stop = useCallback(() => {
    clear()
  }, [clear])

  useEffect(() => {
    start()
    return clear
  }, [start, clear])

  return {
    time,
    restart,
    stop,
    isRunning,
  }
}
