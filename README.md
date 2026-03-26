# Rollout UI

Rollout UI is a `pnpm` monorepo for reusable React UI packages.

The repository is organized around two library layers:

- `@rollout/ui-kit` — the base UI layer with low-level reusable UI primitives and shared styling foundations.
- `@rollout/ui-features` — a higher-level library with feature and composite components built on top of `@rollout/ui-kit`.

In addition to the libraries, the monorepo contains a dedicated Storybook app used to develop, preview, and document components across packages.

## Tech stack

- `pnpm` workspaces
- `Turbo` for task orchestration
- `React`
- `TypeScript`
- `Storybook`
- `Tailwind CSS`
- `shadcn/ui` as the design-system direction for the component layer

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

## Packages

### `packages/ui-kit`

Base package for shared UI elements, styling primitives, and future shadcn-based foundational components.

Typical responsibilities:

- design tokens and shared styles
- low-level UI primitives
- reusable building blocks used by other packages

### `packages/ui-features`

Package for more complex, composed UI pieces that depend on `@rollout/ui-kit`.

Typical responsibilities:

- business-ready UI blocks
- composed feature components
- higher-level patterns assembled from base UI-kit parts

### `apps/storybook`

Storybook app used for:

- local UI development
- visual review of packages
- documenting states and examples for components that live in workspace packages

Stories are intended to stay close to their components inside the package source tree, while Storybook itself is isolated into a separate app.

## Getting started

### Requirements

- Node.js `v22.21.1` (see `.nvmrc`)
- `pnpm` `10.32.1`

### Install dependencies

```bash
pnpm install
```

## Available commands

### Build all packages

```bash
pnpm build
```

### Run Storybook

```bash
pnpm storybook
```

### Format the repository

```bash
pnpm format
```

### Check formatting

```bash
pnpm format:check
```

## Release workflow

This repository uses Changesets for versioning and publishing.

- CI workflow builds the workspace, builds Storybook, and checks formatting.
- Publish workflow runs on `main` and uses Changesets to either:
  - create/update a release pull request, or
  - publish packages to npm when release changesets are present.

To publish from GitHub Actions, configure the following repository secret:

- `NPM_TOKEN` — npm automation token with publish access

## Notes on styling

The repository is being prepared for Tailwind + shadcn-based distribution. At the moment, the monorepo already reflects the intended layering:

- `ui-kit` for the base design system and reusable primitives
- `ui-features` for composed feature components that consume the base layer

## License

MIT — see [`LICENSE.md`](./LICENSE.md).
