import { ItemCardDetailNavBar } from './components/ItemCardDetailNavBar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Features/Card/ItemCardDetail/NavBar',
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

export const NoHandlers: Story = {
  args: {
    isLiked: true,
    onLikeClick: undefined,
    onBackClick: undefined,
    onEllipsisClick: undefined,
  },
}
