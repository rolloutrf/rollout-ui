import iconUrl from './assets/rollout-icon.webp'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: '0. Overview/Introduction',
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className={'flex flex-col space-y-4 items-center text-center'}>
      <img src={iconUrl} alt="Rollout UI" className={'h-12 w-12'} />
      <h1 className={'text-2xl font-semibold'}>Rollout UI</h1>
      <p className={'text-sm text-secondary'}>Open Source UI Library for fintech applications.</p>
      <div>
        <a
          className={'text-sm underline'}
          href="https://github.com/rolloutrf/rollout-ui"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repository
        </a>
      </div>
    </div>
  ),
}

