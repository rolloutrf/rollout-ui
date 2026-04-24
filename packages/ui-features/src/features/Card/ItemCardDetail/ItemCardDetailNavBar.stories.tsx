import { ItemCardDetailNavBar } from './components/ItemCardDetailNavBar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'features/Card/ItemCardDetailNavBar',
  component: ItemCardDetailNavBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onLikeClick: { action: 'onLikeClick' },
    onBackClick: { action: 'onBackClick' },
    onEllipsisClick: { action: 'onEllipsisClick' },
  },
} satisfies Meta<typeof ItemCardDetailNavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isLiked: false,
  },
}
