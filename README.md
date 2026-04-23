# Rollout UI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

Open Source UI Components for fintech applications.

## Storybook

https://rolloutrf.github.io/rollout-ui

## Figma

https://rolloutblocks.tilda.ws/libraries

## How to use

### Requirements

- React 18+
- tailwindcss v4
- TypeScript 5+

### Important note on usage

There is two ways to consume the packages: via `@rollout/ui-kit` and `@rollout/ui-features` npm packages, or by copying the source code through shadcn's `add` utility (**recommended!**).

## Usage via shadcn/ui registry (Recommended)

... to be added soon

## Usage via npm packages

### Installation

```bash
npm install @rollout/ui-kit @rollout/ui-features
```

### Setup

Add the package to your Tailwind CSS source scanning in your main CSS file (`app.css` / `globals.css` / `styles.css`):

```css
@import 'tailwindcss';
@source "@rollout/ui-kit";
@source "@rollout/ui-features";
```

### Usage

```tsx
import { Button } from '@rollout/ui-kit'
;<Button variant="default" size="lg">
  Click me
</Button>
```

### Rollout styles and Tailwind

If you want to import Rollout styles, you can do it like this:

```css
@import 'tailwindcss';
@import '@rollout/ui-kit/styles.css'; /* rollout theme */
@import '@rollout/ui-features/styles.css'; /* rollout theme */
@source "@rollout/ui-kit";
@source "@rollout/ui-features";
```

## Contributing

For development workflow, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [`LICENSE.md`](./LICENSE.md).
