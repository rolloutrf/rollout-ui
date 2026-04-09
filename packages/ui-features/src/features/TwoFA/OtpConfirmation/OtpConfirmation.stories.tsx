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
    changePhoneText: { control: 'text' },
    resetSeconds: { control: 'number' },
    onResend: { control: false },
    onChangePhone: { control: false },
    inputOtpProps: { control: false },
    inputOtpSlotProps: { control: false },
    resendButtonProps: { control: false },
    changePhoneButtonProps: { control: false },
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
    resetSeconds: 59,
    resendText: 'Отправить код еще раз',
    changePhoneText: 'Изменить номер',
    onResend: async () => {},
    onChangePhone: async () => {},
  },
}

export const InvalidOtpInput: Story = {
  args: {
    ...Primary.args,
    errorText: 'Неправильный код — попробуйте еще раз или запросите новый.',
    inputOtpProps: {
      'aria-invalid': true,
    },
    inputOtpSlotProps: {
      'aria-invalid': true
    }
  },
}
