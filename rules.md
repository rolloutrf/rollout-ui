# Code Organization Rules

## ui-features

- Keep component types separated from component implementation files.
- Place component type files under a `types` directory inside the feature (or slice).
- Type file names must end with `types.ts` (for example: `OtpConfirmation.types.ts`).
- The main props type for a component must be named `ComponentNameProps`.
- Place component implementation files under a `components` directory inside the feature (or slice).

## Import order

- Keep value imports before `import type` imports.
- Group imports in this order: external libraries, monorepo package imports, then same-package internal imports.
- Inside monorepo package imports keep order: `@rollout/ui-kit` before `@rollout/ui-features`.
