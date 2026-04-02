import { DotPassword } from './components/DotPassword'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'features/TwoFA/DotPassword',
  component: DotPassword,
  argTypes: {
    slotsCount: { control: 'number' },
    title: { control: 'text' },
    subTitle: { control: 'text' },
    policy: { control: false },
  },
} satisfies Meta<typeof DotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    slotsCount: 4,
    title: 'Повторите пароль',
    subTitle: 'Тот же, который используете при входе\u00A0в баланс для покупок',
  },
}
