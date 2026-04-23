import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { useTimer } from './useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with startValueMs', () => {
    const { result } = renderHook(() => useTimer({ startValueMs: 5000 }))

    expect(result.current.time).toBe(5000)
  })

  it('should start timer automatically on mount', () => {
    const onStart = vi.fn()
    const { result } = renderHook(() => useTimer({ startValueMs: 10000, tickMs: 1000, onStart }))

    expect(result.current.isRunning).toBe(true)
    expect(onStart).toHaveBeenCalledWith(10000)
  })

  it('should decrement time by tickMs every tick with default direction', () => {
    const { result } = renderHook(() => useTimer({ startValueMs: 10000, tickMs: 1000, minValueMs: 0 }))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe(9000)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.time).toBe(7000)
  })

  it('should increment time with intervalDirection = 1', () => {
    const { result } = renderHook(() =>
      useTimer({ startValueMs: 0, tickMs: 1000, intervalDirection: 1, maxValueMs: 10000 })
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe(1000)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.time).toBe(3000)
  })

  it('should call onFinish when minValueMs is reached', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() =>
      useTimer({
        startValueMs: 3000,
        tickMs: 1000,
        minValueMs: 0,
        onFinish,
      })
    )

    expect(result.current.isRunning).toBe(true)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(onFinish).toHaveBeenCalledWith(3000, 0)
    expect(result.current.isRunning).toBe(false)
  })

  it('should call onFinish when maxValueMs is reached', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() =>
      useTimer({
        startValueMs: 0,
        tickMs: 1000,
        intervalDirection: 1,
        maxValueMs: 3000,
        onFinish,
      })
    )

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(onFinish).toHaveBeenCalledWith(0, 3000)
    expect(result.current.isRunning).toBe(false)
  })

  it('should stop timer on stop() call', () => {
    const { result } = renderHook(() => useTimer({ startValueMs: 10000, tickMs: 1000, minValueMs: 0 }))

    expect(result.current.isRunning).toBe(true)

    act(() => {
      result.current.stop()
    })

    expect(result.current.isRunning).toBe(false)

    const timeBeforeAdvance = result.current.time

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe(timeBeforeAdvance)
  })

  it('should restart timer and reset time', () => {
    const { result } = renderHook(() => useTimer({ startValueMs: 10000, tickMs: 1000, minValueMs: 0 }))

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.time).toBe(7000)

    act(() => {
      result.current.restart()
    })

    expect(result.current.time).toBe(10000)
    expect(result.current.isRunning).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe(9000)
  })
})
