# Rollout UI

Rollout UI is a `pnpm` monorepo for reusable React UI packages.

The repository is organized around two library layers:

- `@rollout/ui-kit` — the base UI layer with low-level reusable UI primitives and shared styling foundations.
- `@rollout/ui-features` — a higher-level library with feature and composite components built on top of `@rollout/ui-kit`.

In addition to the libraries, the monorepo contains a dedicated Storybook app used to develop, preview, and document components across packages.

## Figma

https://rolloutblocks.tilda.ws/libraries

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

## Getting started

### Commands

```bash
pnpm install # install dependencies (run in root)
pnpm storybook # Storybook for local development
pnpm build # Mandatory before publishing
```

## Notes on styling

The repository is being prepared for Tailwind + shadcn-based distribution. At the moment, the monorepo already reflects the intended layering:

- `ui-kit` for the base design system and reusable primitives
- `ui-features` for composed feature components that consume the base layer

## License

MIT — see [`LICENSE.md`](./LICENSE.md).
