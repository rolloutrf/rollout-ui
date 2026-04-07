import type { Button, Field, Input } from '@rollout/ui-kit'

import type React from 'react'

export type PhoneEntryProps = {
  policy?: React.ReactNode
  title?: string
  subTitle?: string
  buttonText?: React.ReactNode
  inputName?: string
  fieldProps?: React.ComponentProps<typeof Field>
  inputProps?: React.ComponentProps<typeof Input>
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
}
