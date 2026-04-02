import { Button, Input } from '@rollout/ui-kit'

import type { PhoneEntryProps } from '@features-src/features/TwoFA/PhoneEntry/types/PhoneEntry.types'
import { Heading } from '@features-src/features/TwoFA/shared/ui/Heading'
import { Notice } from '@features-src/features/TwoFA/shared/ui/Notice'

export const PhoneEntry = ({
  policy,
  title = 'Укажите номер телефона',
  subTitle = 'Мы привяжем его к кошельку и в случае чего отправим смс с кодом. Например, если решите закрыть баланс для покупок.',
}: PhoneEntryProps) => {
  return (
    <div className={'space-y-7 max-w-xs w-full'}>
      <Heading subTitle={subTitle} title={title} />
      <Input type="tel" placeholder="+7 (900) 123-4567" />
      <Button className={'w-full'}>Дальше</Button>
      <Notice>{policy}</Notice>
    </div>
  )
}
