---
description: First-run setup for rollout-ui — installs Node, pnpm, dependencies
---

# /setup — first-run installer

Run via the `Bash` tool:

```bash
pnpm rollout:setup
```

(`pnpm rollout:setup` is a thin alias for `bash scripts/setup.sh`. The script
is interactive only when `nvm` itself is missing — at that point it stops and
prints the install line for the user to run.)

After `setup.sh` finishes it automatically chains into preflight. If preflight
exits non-zero, follow up with `/preflight` for the MCP-side checks Bash cannot
do (Figma key, shadcn list, preview list, design context whoami).

## What setup does (no questions asked)

1. Sources `nvm` and verifies it's installed; prints install line if missing.
2. Installs Node `22.21.1` via `nvm install` (skips if already present).
3. Sets it as default and switches the current shell to it.
4. Activates `pnpm@10.32.1` via `corepack`.
5. Runs `pnpm install` in the repo root.
6. Runs `bash scripts/preflight.sh` to verify.

## What it does NOT do

- Does not write to `~/.claude.json` or `~/.claude/launch.json` — those
  contain user secrets and machine-specific paths.
- Does not clone the repo (assumes the user is already inside it — chicken
  and egg).
- Does not install Claude Code itself.

If anything in the bash output looks unexpected, capture the last few lines
and route them through `/preflight` for a structured action list.
