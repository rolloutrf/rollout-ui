import { createElement } from 'react'

import type { Preview } from '@storybook/react-vite'
import '../src/styles.css'

const preview: Preview = {
  decorators: [(story) => createElement('div', { className: 'max-w-xs w-full' }, createElement(story))],
  parameters: {
    darkMode: {
      current: 'light',
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
