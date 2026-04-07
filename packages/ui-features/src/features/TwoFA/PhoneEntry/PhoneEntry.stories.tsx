import { PhoneEntry } from './components/PhoneEntry'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'features/TwoFA/PhoneEntry',
  component: PhoneEntry,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    buttonText: { control: 'text' },
    policy: { control: false },
    fieldProps: { control: false },
    inputProps: { control: false },
    buttonProps: { control: false },
  },
} satisfies Meta<typeof PhoneEntry>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Укажите номер телефона',
    subTitle:
      'Мы привяжем его к кошельку и в случае чего отправим смс с кодом. Например, если решите закрыть баланс для покупок.',
    policy: (
      <div className={'text-xs'}>
        Нажимая кнопку, вы соглашаетесь на обработку и передачу данных в соответствии с политикой
        оператору услуг информационного обмена РОЛЛАУТ в целях запуска идентификации банком
      </div>
    ),
    buttonText: 'Дальше',
  },
}

export const InvalidPhoneInput: Story = {
  args: {
    ...Primary.args,
    buttonText: 'Исправить номер',
    inputProps: {
      type: 'tel',
      defaultValue: '+7 (900) 12',
      'aria-invalid': true,
      'aria-label': 'Phone number',
    },
  },
}

export const DisabledSubmit: Story = {
  args: {
    ...Primary.args,
    buttonText: 'Проверьте номер',
    inputProps: {
      type: 'tel',
      defaultValue: '+7 (900) 123-4567',
      'aria-invalid': true,
    },
    buttonProps: {
      disabled: true,
    },
  },
}
