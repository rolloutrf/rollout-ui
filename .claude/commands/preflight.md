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

Bash cannot reach Claude Code's MCP servers. Fire these four in parallel:

| Call | Expected |
|---|---|
| `mcp__Shadcn_UI__list_components` | array of ~46 components |
| `mcp__Claude_Preview__preview_list` | array (may be empty) |
| `mcp__c0861a9b-…__whoami` | object with email and `plans[].name === 'ROLLOUT'` (View seat) |
| `mcp__figma__get_figma_data({ fileKey: 'p2bAIyTB6oJTGWjjR8NwRB', nodeId: '221:4087' })` | YAML structure, no 403 |

## Step 3 — Print a unified summary

A single colored table: `Component → Status → Action`. Map MCP failures to the
exact remedy:

- **figma 403** → "Outdated FIGMA_API_KEY. Open
  https://www.figma.com/developers/api#access-tokens, create a new token (File
  content read), edit `~/.claude.json` → `mcpServers.figma.env.FIGMA_API_KEY`,
  then **restart Claude Code (Cmd+Q)**." Do NOT touch `~/.claude.json` yourself
  — secrets belong to the user.
- **preview_list missing 'rollout-ui-demo'** → "Add to `~/.claude/launch.json`
  configurations[] (preflight bash already printed the snippet)."
- **shadcn list errors** → "Restart Claude Code; if persists, the MCP server
  may be down — see plugin status."
- **c0861a9b-… seat issue** → "Working without the Code Connect MCP is fine —
  switch to `figma` MCP + `Claude_Preview` for visual diff."

## Step 4 — Verdict

If everything is green, say so in one line and exit. If something is red,
print the action list and stop — do **not** continue into other workflows
silently.
