import { PhoneEntry } from './components/PhoneEntry'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'features/TwoFA/PhoneEntry',
  component: PhoneEntry,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    policy: { control: false },
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
  },
}
