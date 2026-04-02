# Rollout UI

Rollout UI is a `pnpm` monorepo for reusable React UI packages.

The repository is organized around two library layers:

- `@rollout/ui-kit` — the base UI layer with low-level reusable UI primitives and shared styling foundations.
- `@rollout/ui-features` — a higher-level library with feature and composite components built on top of `@rollout/ui-kit`.

In addition to the libraries, the monorepo contains a dedicated Storybook app used to develop, preview, and document components across packages.

## Figma

https://rolloutblocks.tilda.ws/libraries

## How to use

### Requirements

- tailwindcss v4
- React 18+
- TypeScript 5+

### Important note on usage

There is two ways to consume the packages: via `@rollout/ui-kit` and `@rollout/ui-features` npm packages, or by copying the source code through shadcn's `add` utility (**recommended!**).

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

## Usage via shadcn/ui registry

... to be added soon

## Repository structure

```text
.
├── apps/
│   └── storybook/          # Storybook application for local development and docs
├── packages/
│   ├── ui-kit/             # Base UI primitives and shared styling building blocks
│   └── ui-features/        # Composite/feature components built on top of ui-kit
├── .changeset/             # Versioning and release metadata
├── package.json            # Root workspace scripts and shared dev tooling
├── pnpm-workspace.yaml     # Workspace package definitions
└── turbo.json              # Turbo pipeline configuration
```

## Feature development

### Commands

```bash
pnpm install # install dependencies (run in root)
pnpm storybook # Storybook for local development
pnpm build # Mandatory before publishing
```

Features are built on top of the base components from `ui-kit`. If the required component is not there, you need to add it to `ui-kit` using the `shadcn/ui` utility, and then use it in `ui-features`.

### How to add a component from `shadcn/ui`?

#### The list of shadcn components is available here: https://ui.shadcn.com/docs/components.

1. Add the component primitive (using the `Button` component as an example):

```bash
cd packages/ui-kit
pnpm dlx shadcn@latest add button
```

or with a single command

```bash
shadcn add button -c packages/ui-kit
```

2. During installation, the utility may ask you to choose **Radix UI** or **Base UI** — you must choose **Base UI**

_The utility will create the primitive (which you should not forget to add to git!), according to `packages/ui-kit/components.json`_

3. Add the export to `packages/ui-kit/src/index.ts`

```tsx
export { Button } from './components/button'
```

## License

MIT — see [`LICENSE.md`](./LICENSE.md).
