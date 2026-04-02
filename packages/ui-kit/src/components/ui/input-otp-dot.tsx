import { OTPInputContext } from 'input-otp'
import * as React from 'react'

import { cn } from '@ui-kit/lib/utils'

type InputOTPDotStatus = 'idle' | 'success' | 'error'

type InputOTPDotProps = React.ComponentProps<'div'> & {
  index: number
  status?: InputOTPDotStatus
}

function InputOTPDot({ index, className, status = 'idle', ...props }: InputOTPDotProps) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, isActive } = inputOTPContext?.slots[index] ?? {}
  const isFilled = Boolean(char)

  return (
    <div
      data-slot="input-otp-dot"
      data-active={isActive}
      data-filled={isFilled}
      data-status={status}
      className={cn(
        'size-3.5 rounded-full bg-muted-foreground/25 transition-all outline-none',
        'data-[filled=true]:bg-foreground',
        'data-[status=success]:bg-green-500',
        'data-[status=error]:bg-red-500',
        className
      )}
      aria-label={`Passcode symbol ${index + 1}`}
      {...props}
    />
  )
}

export { InputOTPDot }
