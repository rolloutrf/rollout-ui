import { memo } from 'react'

import { Button, cn } from '@rollout/ui-kit'

import type { OtpConfirmationChangePhoneProps } from '@features-src/features/TwoFA/OtpConfirmation/types/OtpConfirmation.types'

export const ChangePhoneButton = memo(
  ({ changePhoneText, onChangePhone, changePhoneButtonProps }: OtpConfirmationChangePhoneProps) => (
    <Button
      variant="link"
      {...changePhoneButtonProps}
      className={cn('text-sm p-0 justify-start h-auto cursor-pointer underline', changePhoneButtonProps?.className)}
      onClick={onChangePhone}
    >
      {changePhoneText}
    </Button>
  )
)
