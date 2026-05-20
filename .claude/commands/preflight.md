---
description: Diagnose rollout-ui dev environment + MCP servers, autofix what is safe
---

# /preflight — environment + MCP diagnosis

You are running a pre-flight check for the rollout-ui demo workflow.

## Step 1 — Bash diagnostic (with autofix)

Run via the `Bash` tool:

```bash
ROLLOUT_AUTOFIX=1 pnpm rollout:preflight
```

This auto-fixes a missing `@rolldown/binding-*` (reinstalls under Node 22) and
prints the rest as actionable items. If exit code is 0, environment is green.

## Step 2 — MCP checks (parallel, single message)

Bash cannot reach Claude Code's MCP servers. Fire these three in parallel:

| Call                                                                                    | Expected                |
| --------------------------------------------------------------------------------------- | ----------------------- |
| `mcp__Shadcn_UI__list_components`                                                       | array of ~46 components |
| `mcp__Claude_Preview__preview_list`                                                     | array (may be empty)    |
| `mcp__figma__get_figma_data({ fileKey: 'p2bAIyTB6oJTGWjjR8NwRB', nodeId: '221:4087' })` | YAML structure, no 403  |

### Step 2a — Figma token interactive recovery

If the `mcp__figma__*` tools are **completely missing** from your available
tools (plugin not installed), or if `get_figma_data` returns **403 / `Invalid
token`**, do not just print a generic action — drive the user through it:

1. Send a plain-text message explaining the exact symptom (missing plugin vs
   bad token).
2. Print the **link to issue a new token**:
   `https://www.figma.com/developers/api#access-tokens` (scope: **File content
   → Read-only**, name e.g. `rollout-ui-mcp`).
3. Print the exact CLI install line (if plugin missing):
   `claude mcp add figma -- npx -y figma-developer-mcp --stdio`.
4. Print the exact `~/.claude.json` block the user must end up with (with a
   placeholder for the token — never the real value):
   ```json
   "figma": {
     "command": "npx",
     "args": ["-y", "figma-developer-mcp", "--stdio"],
     "env": { "FIGMA_API_KEY": "figd_…" }
   }
   ```
5. Remind: **restart Claude Code (Cmd+Q)** after editing `~/.claude.json` —
   `env` is read once on process start.
6. Use `AskUserQuestion` with one question: "Готов перепроверить figma после
   установки токена?" — options: **«Да, прогнать /preflight снова»**, **«Нет,
   пока пропустить»**. Do **not** ask for the token value in chat — that's
   user secret material, it belongs in `~/.claude.json`, not in the conversation.
7. If the user picks «Да» — re-fire only the `mcp__figma__get_figma_data`
   call and report green/red. If still red — point at the same link plus
   `apps/demo/HOW_TO_ADD_PAGE.md §1.5.1` and stop.

> Code Connect MCP (`mcp__c0861a9b-…`) is intentionally NOT probed —
> `/new-page` and `/update-page` don't use it (no published Code Connect
> mappings in this repo, see [`apps/demo/AGENTS.md` §0.3](../../apps/demo/AGENTS.md#03-mcp-серверы)).
> Probing it here would burn one tool-call from the View-seat quota every
> preflight. The MCP stays connected for ad-hoc use.

## Step 3 — Print a unified summary

A single colored table: `Component → Status → Action`. Map MCP failures to the
exact remedy:

- **figma 403 / missing plugin** → run the **Step 2a** interactive recovery
  above (link, install line, JSON block, restart reminder, follow-up
  AskUserQuestion). Do NOT touch `~/.claude.json` yourself — secrets belong to
  the user.
- **preview_list missing 'rollout-ui-demo'** → "Add to `~/.claude/launch.json`
  configurations[] (preflight bash already printed the snippet)."
- **shadcn list errors** → "Restart Claude Code; if persists, the MCP server
  may be down — see plugin status."

## Step 4 — Verdict

If everything is green, say so in one line and exit. If something is red,
print the action list and stop — do **not** continue into other workflows
silently.
