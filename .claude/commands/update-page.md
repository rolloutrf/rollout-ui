---
description: Update an existing apps/demo page to match an updated Figma design
---

# /update-page — bring a page back in sync with Figma

## Step 1 — Ask 2 questions (single AskUserQuestion call)

1. **Файл страницы** (`page_file`) — например `apps/demo/src/pages/profile/PersonalDataPage.tsx`.
2. **Figma URL** (`figma_url`) — frame с обновлённым макетом.

## Step 2 — Load the rules

Read `apps/demo/.claude/page-recipe.yaml` (container, tokens, forbiddens,
verification). Apply, do not duplicate.

## Step 3 — Read current code + new design (parallel)

In a single message:

- `Read` the existing page file.
- `mcp__figma__get_figma_data({ fileKey, nodeId })`
- `mcp__c0861a9b-…__get_design_context(...)` — React+Tailwind reference
- `mcp__c0861a9b-…__get_screenshot(...)` — visual reference

## Step 4 — Diff and apply

Build a list of differences across these dimensions:

- Layout / container / spacing tokens
- Typography (sizes, weights, line-heights)
- Colors (token names, never hex)
- Component variants and states (default/hover/focused/disabled/highlighted)
- Added or removed blocks
- Navigation (NavBar actions appearing/disappearing)

Apply each diff. Do **not** touch components in `@rollout/ui-kit` unless the
design genuinely requires a new variant — if so, stop and ask.

## Step 5 — Verify (mandatory)

Recipe verification block:

1. `mcp__Claude_Preview__preview_start({ name: 'rollout-ui-demo' })`
2. Navigate to the page's route → `preview_screenshot`
3. Diff against figma `get_screenshot` (light + dark + mobile)
4. `preview_console_logs({ level: 'error' })` — must be empty

## Step 6 — Report

A short before/after summary: bullet list of changes (one line each), pointer to
the route URL, and screenshots.

## HARD STOPS

- Diff implies a new ui-kit primitive → describe it and wait for approval.
- Figma 403 → point user to `apps/demo/HOW_TO_ADD_PAGE.md §1.4` and stop.
- Design ambiguity that materially affects layout/behavior → ask.
