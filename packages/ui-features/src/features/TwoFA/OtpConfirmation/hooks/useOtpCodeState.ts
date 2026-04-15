import { useCallback, useState } from 'react'

import type { OtpFormProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpForm.types'

export const useOtpCodeState = (
  slotsCount: number,
  onComplete: OtpFormProps['onComplete']
): [string, (v: string) => void] => {
  const [value, setValue] = useState<string>('')
  const onInnerChange = useCallback(
    (v: string) => {
      setValue(v)
      if (v.length === slotsCount) {
        onComplete?.(v)
      }
    },
    [onComplete, slotsCount]
  )

  return [value, onInnerChange]
}
