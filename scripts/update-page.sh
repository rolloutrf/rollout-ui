#!/usr/bin/env bash
# Build an "update existing page" prompt and copy it to clipboard.
# Mirrors §2.2 of apps/demo/HOW_TO_ADD_PAGE.md.
#
# Usage:
#   bash scripts/update-page.sh                                # interactive
#   bash scripts/update-page.sh "apps/demo/src/pages/foo/Bar.tsx" "<figma-url>"

set -uo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="$REPO_DIR/.claude"
LOG_FILE="$LOG_DIR/last-prompt.md"
mkdir -p "$LOG_DIR"

if [[ -t 1 ]]; then
  CYA=$'\033[36m'; BLD=$'\033[1m'; DIM=$'\033[2m'; RST=$'\033[0m'
else
  CYA=""; BLD=""; DIM=""; RST=""
fi

ask() { local p="$1" a; read -r -p "$p: " a; echo "$a"; }

PAGE="${1:-}"
FIGMA_URL="${2:-}"

if [[ -z "$PAGE" || -z "$FIGMA_URL" ]]; then
  printf "%supdate-page prompt builder%s\n%s2 questions; result is copied to your clipboard.%s\n\n" "$BLD" "$RST" "$DIM" "$RST"
  [[ -z "$PAGE" ]] && PAGE="$(ask 'Файл страницы (apps/demo/src/pages/<area>/<Name>Page.tsx)')"
  [[ -z "$FIGMA_URL" ]] && FIGMA_URL="$(ask 'Figma URL (с ?node-id=…)')"
fi

[[ -z "$PAGE" || -z "$FIGMA_URL" ]] && { echo "Both fields are required." >&2; exit 1; }

read -r -d '' PROMPT <<EOF || true
Обнови экран \`$PAGE\` по макету Figma:
$FIGMA_URL

Сравни текущую реализацию с \`mcp__figma__get_figma_data\` и \`mcp__c0861a9b-…__get_design_context\`. Найди расхождения (токены, размеры, состояния, новые/удалённые блоки) и приведи к макету.

Правила: \`apps/demo/AGENTS.md\` + \`apps/demo/.claude/page-recipe.yaml\`. Не трогай компоненты в \`@rollout/ui-kit\` без необходимости.

Верификация: \`mcp__Claude_Preview__preview_start({name:'rollout-ui-demo'})\` → \`preview_screenshot\` ↔ \`mcp__c0861a9b-…__get_screenshot\` (light + dark + mobile); \`preview_console_logs({level:'error'})\` пусто.

После — короткий отчёт: что изменено и почему, скриншоты до/после.
EOF

printf "%s\n" "$PROMPT" > "$LOG_FILE"

if command -v pbcopy >/dev/null 2>&1; then
  printf "%s" "$PROMPT" | pbcopy
  printf "\n%s✓ Промпт скопирован в clipboard%s — вставь в Claude Code и нажми Enter.\n" "$CYA" "$RST"
else
  printf "\n%s(pbcopy not available — see log file below)%s\n" "$DIM" "$RST"
fi
printf "%sLog:%s %s\n" "$DIM" "$RST" "$LOG_FILE"
