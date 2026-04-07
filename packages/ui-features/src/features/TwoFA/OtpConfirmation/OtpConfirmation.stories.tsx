import { OtpConfirmation } from './components/OtpConfirmation'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'features/TwoFA/OtpConfirmation',
  component: OtpConfirmation,
  argTypes: {
    slotsCount: { control: 'number' },
    title: { control: 'text' },
    subTitle: { control: 'text' },
    policy: { control: false },
    resendText: { control: 'text' },
    resendErrorText: { control: 'text' },
    resetSeconds: { control: 'number' },
    inputOtpProps: { control: false },
    inputOtpSlotProps: { control: false },
    buttonProps: { control: false },
  },
} satisfies Meta<typeof OtpConfirmation>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    slotsCount: 6,
    title: 'Подтвердите телефон и платите кошельком',
    subTitle: 'Введите код из смс, мы отправили его на номер +7 999 999-99-99',
    policy: 'Вводя код вы соглашаетесь с офертой банка',
    resetSeconds: 30,
  },
}

export const ResendErrorState: Story = {
  args: {
    ...Primary.args,
    resetSeconds: 0,
    resendText: 'Отправить код еще раз',
    resendErrorText: 'Сервис недоступен. Попробуйте через минуту.',
    onResend: async () => {
      throw new Error('Network error')
    },
    buttonProps: {
      className: 'justify-start',
    },
  },
}

export const InvalidOtpInput: Story = {
  args: {
    ...Primary.args,
    inputOtpProps: {
      'aria-invalid': true,
      defaultValue: '12',
    },
    inputOtpSlotProps: {
      className: 'border-destructive',
    },
  },
}

