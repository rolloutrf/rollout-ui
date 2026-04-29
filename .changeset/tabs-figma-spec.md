---
'@rollout/ui-kit': minor
---

Update default `Tabs` to match shadcn-actual Figma spec while keeping the canonical shadcn-base-ui structure (`@base-ui/react/tabs`):

- TabsList: `flex w-full rounded-2xl p-1 bg-secondary h-10` (was `inline-flex w-fit rounded-lg p-[3px] bg-muted h-8`).
- TabsTrigger: `rounded-xl` (was `rounded-md`).
- Active state in **light**: `bg-background` only — no shadow (drops `data-active:shadow-sm`).
- Active state in **dark**: `dark:data-active:border-foreground/15` (visible outline) instead of `dark:data-active:border-input` (which collapses with `bg-secondary` track).

Selectors `data-horizontal:` / `group-data-horizontal/tabs:` (and `vertical` analogues) were rewritten to `data-[orientation=horizontal]:` / `group-data-[orientation=horizontal]/tabs:` because `@base-ui/react/tabs` only emits `data-orientation="…"`, not the bare `data-horizontal=""` attribute the upstream classes target.

Use `<Tabs><TabsList><TabsTrigger>…` without inline overrides; for underline-style tabs use `<TabsList variant="line">`.
