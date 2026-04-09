import { useCallback, useRef, useState } from 'react'

type DotStatus = 'idle' | 'success' | 'error'

type UseDotPasswordParams = {
  slotsCount: number
  onComplete?: (value: string) => Promise<void>
}

export const useDotPassword = ({ slotsCount, onComplete }: UseDotPasswordParams) => {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<DotStatus>('idle')
  const [errorText, setErrorText] = useState<React.ReactNode>(null)
  const requestIdRef = useRef(0)

  const handleChange = useCallback(
    async (nextValue: string) => {
      setValue(nextValue)
      setStatus('idle')
      setErrorText(null)

      if (nextValue.length !== slotsCount || !onComplete) return

      const requestId = ++requestIdRef.current

      try {
        await onComplete(nextValue)
        if (requestId === requestIdRef.current) {
          setStatus('success')
        }
      } catch (error) {
        if (requestId === requestIdRef.current) {
          setStatus('error')
          setErrorText(error instanceof Error ? error.message : 'Unknown error')
        }
      }
    },
    [slotsCount, onComplete]
  )

  return { value, status, errorText, handleChange }
}
