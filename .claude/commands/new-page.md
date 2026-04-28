---
description: Create a new page in apps/demo from a Figma design — agent does the rest
---

# /new-page — autonomous new-page workflow

You will create a new page in `apps/demo` from a Figma frame. Ask the user
exactly four questions, then carry out the full workflow without further prompts
unless one of the **HARD STOPS** below is triggered.

## Step 1 — Ask the user 4 questions (single AskUserQuestion call, four `questions[]`)

1. **Название экрана** (`name`) — заголовок, как в Figma. Пример: `Личные данные`.
2. **Figma URL** (`figma_url`) — прямая ссылка на frame, обязательно с `?node-id=…`.
3. **Откуда переход** (`source_page`) — путь к файлу страницы, например
   `apps/demo/src/pages/profile/ProfilePage.tsx`.
4. **На каком элементе** (`entry_desc`) — описание блока/кнопки в человеческом
   виде (маркер-текст, визуальные приметы), без номеров строк.
5. **Новый route** (`route`) — путь, например `/profile/personal-data`.

(Use `multiSelect: false` and `freeForm: true` for all five.)

## Step 2 — Load the rules

Read `apps/demo/.claude/page-recipe.yaml`. **This is the source of truth** for
container classes, tokens, forbiddens, and verification steps. Do not duplicate
its contents into your reasoning — apply them.

If the recipe references something you cannot resolve, also consult
`apps/demo/AGENTS.md` and `apps/demo/HOW_TO_ADD_PAGE.md`.

## Step 3 — Read the design (parallel)

In a single message, fire three MCP calls in parallel:

- `mcp__figma__get_figma_data({ fileKey, nodeId })` — node tree + tokens
- `mcp__c0861a9b-…__get_design_context({ fileKey, nodeId, clientFrameworks: 'react', clientLanguages: 'typescript,tailwindcss' })` — React+Tailwind reference
- `mcp__c0861a9b-…__get_screenshot({ fileKey, nodeId })` — visual reference for diff

Extract `fileKey` from `…/design/<fileKey>/…` and `nodeId` from `?node-id=<nodeId>`
(both `:` and `-` separators are valid). For each component instance whose `name`
matches a shadcn primitive, call `mcp__Shadcn_UI__get_component({ componentName })`
in kebab-case as a behavioral reference.

## Step 4 — Implement

Follow the recipe (`page-recipe.yaml`):

- Page file: `apps/demo/src/pages/<area>/<Name>Page.tsx` with the recipe container.
- NavBar per Figma (Title + 40×40 Left/Right actions only if present in design).
- All styling via tokens — no hex, no `bg-orange-500`, no `'Geist'` literal.
- Components from `@rollout/ui-kit` (root import only). Implementation on `@base-ui/react`.
- Route added to `apps/demo/src/App.tsx`. Source-page entry replaced with
  `<Link to="<route>">` from `react-router-dom`, preserving all classes and content.
- Form state: `useState`. No react-hook-form/Zod/API/business logic.

## Step 5 — Verify (mandatory)

Run the verification block from `page-recipe.yaml` in order:

1. `mcp__Claude_Preview__preview_start({ name: 'rollout-ui-demo' })`
2. `mcp__Claude_Preview__preview_eval({ expression: "window.location.href = '<route>'; 'go'" })`
3. `mcp__Claude_Preview__preview_screenshot` → diff against figma get_screenshot
4. Toggle dark theme (ThemeToggle) → screenshot
5. `mcp__Claude_Preview__preview_resize({ preset: 'mobile' })` → screenshot
6. `mcp__Claude_Preview__preview_console_logs({ level: 'error' })` — must be empty

Any visible diff with the Figma design → fix the code, do not "interpret".

## Step 6 — Document

Update `apps/demo/AGENTS.md §2` (file tree, one-line description for the new page).
If `App.tsx` changed, update the §2 Routing table too.

## Step 7 — Final report

A short summary: created/changed files, the new route URL
(`http://localhost:5173<route>`), screenshots (light/dark/mobile),
and a `pnpm changeset` mention if a new ui-kit primitive was added.

---

## HARD STOPS — pause and ask the user

- The needed component is **not** in `@rollout/ui-kit` — describe what you'd add
  (shadcn name → `@base-ui/react/<primitive>`) and wait for confirmation.
- Figma MCP returns **403** (invalid token) — direct the user to
  `apps/demo/HOW_TO_ADD_PAGE.md §1.4` and stop.
- The design is ambiguous in a way that materially affects layout/behavior —
  ask, don't guess.
- `mcp__c0861a9b-…` hits its View-seat rate limit — switch to plain `figma` MCP
  + `Claude_Preview` for diff and continue.

## Style — what NOT to do (recipe forbidden list)

`deep_imports`, `radix-ui`, `pnpm dlx shadcn add`, hardcoded colors / fonts,
`console.log` in handlers, "improvements beyond Figma".
