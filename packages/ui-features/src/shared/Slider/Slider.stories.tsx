import { Slider } from './components/Slider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'shared/Slider',
  component: Slider,
  argTypes: {
    sliderId: { control: 'text' },
    className: { control: false },
    slideClassName: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => (
    <Slider {...args}>
      <div key="1" className="flex h-full w-full items-center justify-center bg-muted text-2xl font-bold">
        Slide 1
      </div>
      <div
        key="2"
        className="flex h-full w-full items-center justify-center bg-blue-100 text-2xl font-bold text-blue-950"
      >
        Slide 2
      </div>
      <div
        key="3"
        className="flex h-full w-full items-center justify-center bg-green-100 text-2xl font-bold text-green-950"
      >
        Slide 3
      </div>
    </Slider>
  ),
}
