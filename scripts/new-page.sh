#!/usr/bin/env bash
# Build a "new page" prompt for Claude Code from 4 inputs and copy it to the
# clipboard (pbcopy). Mirrors the §2 template in apps/demo/HOW_TO_ADD_PAGE.md.
#
# Usage:
#   bash scripts/new-page.sh                                          # interactive
#   bash scripts/new-page.sh "Личные данные" "<figma-url>" \
#        "apps/demo/src/pages/profile/ProfilePage.tsx" \
#        "блок «Аккаунт»" "/profile/personal-data"

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

ask() { # ask "prompt" "default"
  local p="$1" d="${2:-}" a
  if [[ -n "$d" ]]; then
    read -r -p "$p [$d]: " a; echo "${a:-$d}"
  else
    read -r -p "$p: " a; echo "$a"
  fi
}

NAME="${1:-}"
FIGMA_URL="${2:-}"
SOURCE_PAGE="${3:-}"
ENTRY_DESC="${4:-}"
ROUTE="${5:-}"

if [[ -z "$NAME" ]]; then
  printf "%snew-page prompt builder%s\n%s4 questions; result is copied to your clipboard.%s\n\n" "$BLD" "$RST" "$DIM" "$RST"
  NAME="$(ask 'Название экрана')"
  FIGMA_URL="$(ask 'Figma URL (с ?node-id=…)')"
  SOURCE_PAGE="$(ask 'Откуда переход (путь к файлу страницы)')"
  ENTRY_DESC="$(ask 'На каком элементе (описание блока)')"
  ROUTE="$(ask 'Новый route' '/path/to/page')"
fi

[[ -z "$NAME" || -z "$FIGMA_URL" || -z "$SOURCE_PAGE" || -z "$ENTRY_DESC" || -z "$ROUTE" ]] && {
  echo "All fields are required." >&2
  exit 1
}

read -r -d '' PROMPT <<EOF || true
Реализуй экран «$NAME» в \`apps/demo\` по макету Figma:
$FIGMA_URL

**Точка входа в экран:**
- Со страницы: \`$SOURCE_PAGE\`
- По клику на: $ENTRY_DESC
- Новый route: \`$ROUTE\`

Следуй правилам из \`apps/demo/AGENTS.md\` и \`apps/demo/.claude/page-recipe.yaml\` (контейнер, токены, запреты, верификация).

1. **Чтение макета** — параллельно: \`mcp__figma__get_figma_data\`, \`mcp__c0861a9b-…__get_design_context\` (react+tailwindcss), \`mcp__c0861a9b-…__get_screenshot\`.
2. **Распознай компоненты** в макете и сверь со shadcn/ui через \`mcp__Shadcn_UI__get_component\` (эталон — поведение и визуал).
3. **Реализация на \`@base-ui/react\`** — НЕ Radix, НЕ \`pnpm dlx shadcn add\`. Если нет в \`@rollout/ui-kit\` — спроси перед добавлением (Portal+Positioner+Popup, data-* атрибуты Base UI; экспорт через корневой \`packages/ui-kit/src/index.ts\`; \`pnpm changeset\` minor).
4. **Страница** — \`apps/demo/src/pages/<area>/<Name>Page.tsx\`. Контейнер \`mx-auto flex max-w-[576px] flex-col gap-7 px-4 pt-20 pb-8\`. NavBar по макету (Title \`text-lg font-semibold leading-7 text-foreground\` 18/28 + Left/Right action 40×40 при наличии в Figma).
5. **Только токены** — Geist через \`var(--font-sans)\`; \`bg-background\`/\`text-foreground\`/\`text-muted-foreground\`/\`border-input\`; \`bg-accent\` (оранжевый \`hsl(24 95% 53%)\`) только для бренд-акцентов; \`bg-muted text-foreground\` для highlighted/hover. Радиусы \`rounded-md\` 12 / \`rounded-sm\` 8 / \`rounded-2xl\` 24. Спейсинг \`gap-1..gap-7\`.
6. **Routing**: добавь \`<Route path="$ROUTE" element={<…>} />\` в \`apps/demo/src/App.tsx\`. В \`$SOURCE_PAGE\` замени тот самый блок ($ENTRY_DESC) на \`<Link to="$ROUTE">…</Link>\` из \`react-router-dom\`, сохранив все классы и содержимое. Не \`<a href>\`, не другие элементы.
7. **Состояние формы** — локальный \`useState\`. Без react-hook-form/Zod/API.
8. **Верификация (обязательно)**: \`mcp__Claude_Preview__preview_start({name:'rollout-ui-demo'})\` → перейти на \`$ROUTE\` → \`preview_screenshot\`; сравнить с figma \`get_screenshot\`; light + dark; mobile (\`preview_resize({preset:'mobile'})\`); \`preview_console_logs({level:'error'})\` пусто.
9. **Документация**: обнови дерево в \`apps/demo/AGENTS.md §2\` и таблицу Routing если изменился \`App.tsx\`.
10. **Запреты**: deep imports (\`@rollout/ui-kit/components/...\`), \`radix-ui\`, \`pnpm dlx shadcn add\`, хардкод цветов/шрифтов, \`console.log\` в обработчиках, «улучшения от себя».

Если макет неоднозначен — спроси. Лимит на c0861a9b-… → переходи на \`figma\` MCP + Claude_Preview для diff. 403 figma → новый ключ + рестарт Claude Code. Нужен новый ui-kit компонент → жди подтверждения.

После реализации — короткий отчёт: список файлов, ссылка на роут (\`http://localhost:5173$ROUTE\`), скриншоты light/dark/mobile, упоминание changeset (если был).
EOF

printf "%s\n" "$PROMPT" > "$LOG_FILE"

if command -v pbcopy >/dev/null 2>&1; then
  printf "%s" "$PROMPT" | pbcopy
  printf "\n%s✓ Промпт скопирован в clipboard%s — вставь в Claude Code (Cmd+V) и нажми Enter.\n" "$CYA" "$RST"
else
  printf "\n%s(pbcopy not available — see log file below)%s\n" "$DIM" "$RST"
fi
printf "%sLog:%s %s\n" "$DIM" "$RST" "$LOG_FILE"
