import { Button, Field } from '@rollout/ui-kit'

import { cn } from '@ui-kit/lib/utils'

import { PHONE_MASKS } from '@features-src/features/TwoFA/PhoneEntry/constants/phoneMasks'
import { PhoneMaskedInput } from '@features-src/features/TwoFA/PhoneEntry/components/PhoneMaskedInput'
import type { PhoneEntryProps } from '@features-src/features/TwoFA/PhoneEntry/types/PhoneEntry.types'
import { Heading } from '@features-src/features/TwoFA/shared/ui/Heading'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const PhoneEntry = ({
  policy,
  title = 'Укажите номер телефона',
  subTitle = 'Мы привяжем его к кошельку и в случае чего отправим смс с кодом. Например, если решите закрыть баланс для покупок.',
  buttonText = 'Дальше',
  phoneMask = PHONE_MASKS.ru,
  onPhoneChange,
  fieldProps,
  inputProps,
  buttonProps,
}: PhoneEntryProps) => {
  const { className: buttonClassName, ...restButtonProps } = buttonProps ?? {}

  return (
    <div className={'flex flex-col space-y-7'}>
      <Heading subTitle={subTitle} title={title} />
      <Field {...fieldProps}>
        <PhoneMaskedInput
          mask={phoneMask}
          onValueChange={onPhoneChange}
          {...inputProps}
        />
      </Field>
      <Button className={cn('w-full', buttonClassName)} {...restButtonProps}>
        {buttonText}
      </Button>
      <Notice>{policy}</Notice>
    </div>
  )
}
