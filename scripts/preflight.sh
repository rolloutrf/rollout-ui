#!/usr/bin/env bash
# Pre-flight check for rollout-ui demo workflow.
# Verifies environment readiness; auto-fixes where safe; otherwise prints
# the exact remedy. Exit 0 = ready to develop. Exit 1 = action required.
#
# Usage:
#   bash scripts/preflight.sh           # quiet: only summary + diffs
#   bash scripts/preflight.sh --verbose # show every check
#
# Pairs with: scripts/setup.sh (first-run installer) and the /preflight
# slash-command (adds MCP checks Claude Code can do but bash cannot).

set -uo pipefail

VERBOSE=0
[[ "${1:-}" == "--verbose" || "${1:-}" == "-v" ]] && VERBOSE=1

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_REQ="22.21.1"
PNPM_REQ="10.32.1"

# Colors (skip if not a TTY)
if [[ -t 1 ]]; then
  RED=$'\033[31m'; GRN=$'\033[32m'; YLW=$'\033[33m'; CYA=$'\033[36m'; DIM=$'\033[2m'; BLD=$'\033[1m'; RST=$'\033[0m'
else
  RED=""; GRN=""; YLW=""; CYA=""; DIM=""; BLD=""; RST=""
fi

ok()    { printf "  %sOK%s    %s\n" "$GRN" "$RST" "$1"; }
warn()  { printf "  %sWARN%s  %s\n" "$YLW" "$RST" "$1"; }
fail()  { printf "  %sFAIL%s  %s\n" "$RED" "$RST" "$1"; }
info()  { [[ $VERBOSE -eq 1 ]] && printf "  %s•%s     %s\n" "$DIM" "$RST" "$1" || true; }
section(){ printf "\n%s%s%s\n" "$BLD" "$1" "$RST"; }

ISSUES=0
note_issue() { ISSUES=$((ISSUES + 1)); }

# --- Activate nvm if available ---
if [[ -z "${NVM_DIR:-}" ]]; then
  export NVM_DIR="$HOME/.nvm"
fi
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck disable=SC1091
  source "$NVM_DIR/nvm.sh" >/dev/null 2>&1
  if command -v nvm >/dev/null 2>&1; then
    if [[ -f "$REPO_DIR/.nvmrc" ]] || true; then
      nvm use "$NODE_REQ" >/dev/null 2>&1 || true
    fi
  fi
fi

section "rollout-ui pre-flight"

# --- Node ---
NODE_VER="$(node -v 2>/dev/null || echo none)"
if [[ "$NODE_VER" == "v$NODE_REQ" ]]; then
  ok "Node $NODE_VER"
else
  fail "Node $NODE_VER (need v$NODE_REQ)"
  if command -v nvm >/dev/null 2>&1; then
    echo "        Try: nvm install $NODE_REQ && nvm use $NODE_REQ && nvm alias default $NODE_REQ"
  else
    echo "        nvm not found — install: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash"
  fi
  note_issue
fi

# --- pnpm ---
PNPM_VER="$(pnpm -v 2>/dev/null || echo none)"
if [[ "$PNPM_VER" == "$PNPM_REQ" ]]; then
  ok "pnpm $PNPM_VER"
else
  fail "pnpm $PNPM_VER (need $PNPM_REQ)"
  echo "        Try: corepack enable && corepack prepare pnpm@$PNPM_REQ --activate"
  note_issue
fi

# --- Repo ---
if [[ -d "$REPO_DIR/.git" ]]; then
  BRANCH="$(git -C "$REPO_DIR" branch --show-current 2>/dev/null || echo unknown)"
  ok "repo  $REPO_DIR (branch: $BRANCH)"
else
  fail "repo  $REPO_DIR is not a git checkout"
  echo "        Try: git clone https://github.com/rolloutrf/rollout-ui.git \"$REPO_DIR\""
  note_issue
fi

# --- Native binding (rolldown) — must exist for Vite 8 ---
PLAT=""
case "$(uname -s)-$(uname -m)" in
  Darwin-arm64)  PLAT="darwin-arm64" ;;
  Darwin-x86_64) PLAT="darwin-x64" ;;
  Linux-x86_64)  PLAT="linux-x64-gnu" ;;
  Linux-aarch64) PLAT="linux-arm64-gnu" ;;
esac

BINDING_COUNT=0
if [[ -d "$REPO_DIR/node_modules/.pnpm" ]]; then
  if [[ -n "$PLAT" ]]; then
    BINDING_COUNT="$(ls "$REPO_DIR/node_modules/.pnpm/" 2>/dev/null | grep -c "@rolldown+binding-$PLAT" || true)"
  else
    BINDING_COUNT="$(ls "$REPO_DIR/node_modules/.pnpm/" 2>/dev/null | grep -c "@rolldown+binding-" || true)"
  fi
fi

if [[ "$BINDING_COUNT" -gt 0 ]]; then
  ok "@rolldown/binding present ($PLAT)"
else
  fail "@rolldown/binding missing — node_modules likely installed under wrong Node version"
  if [[ "$NODE_VER" == "v$NODE_REQ" && -d "$REPO_DIR" ]]; then
    if [[ "${ROLLOUT_AUTOFIX:-1}" == "1" ]]; then
      echo "        Auto-fix: rm -rf node_modules && pnpm install (in $REPO_DIR)"
      ( cd "$REPO_DIR" && rm -rf node_modules && pnpm install ) && {
        ok "reinstalled node_modules"
        BINDING_COUNT="$(ls "$REPO_DIR/node_modules/.pnpm/" 2>/dev/null | grep -c "@rolldown+binding-" || true)"
        [[ "$BINDING_COUNT" -gt 0 ]] || { fail "binding still missing after reinstall"; note_issue; }
      } || { fail "auto reinstall failed"; note_issue; }
    else
      echo "        Set ROLLOUT_AUTOFIX=1 to auto-reinstall, or run manually:"
      echo "        cd \"$REPO_DIR\" && rm -rf node_modules && pnpm install"
      note_issue
    fi
  else
    echo "        Fix Node first, then: cd \"$REPO_DIR\" && rm -rf node_modules && pnpm install"
    note_issue
  fi
fi

# --- launch.json (Claude Code preview config) ---
LAUNCH="$HOME/.claude/launch.json"
LAUNCH_NAME_NEW="rollout-ui-demo"
LAUNCH_NAME_OLD="rollout-demo"
if [[ -f "$LAUNCH" ]]; then
  if grep -q "\"$LAUNCH_NAME_NEW\"" "$LAUNCH"; then
    ok "launch.json has \"$LAUNCH_NAME_NEW\""
  elif grep -q "\"$LAUNCH_NAME_OLD\"" "$LAUNCH"; then
    warn "launch.json uses old name \"$LAUNCH_NAME_OLD\" — preview_start may not match"
    echo "        Suggested entry (paste into ~/.claude/launch.json configurations[]):"
    cat <<EOF
        {
          "name": "$LAUNCH_NAME_NEW",
          "cwd": "$REPO_DIR/apps/demo",
          "runtimeExecutable": "$HOME/.nvm/versions/node/v$NODE_REQ/bin/node",
          "runtimeArgs": ["./node_modules/vite/bin/vite.js"],
          "port": 5173
        }
EOF
    if command -v pbcopy >/dev/null 2>&1; then
      cat <<EOF | pbcopy
{
  "name": "$LAUNCH_NAME_NEW",
  "cwd": "$REPO_DIR/apps/demo",
  "runtimeExecutable": "$HOME/.nvm/versions/node/v$NODE_REQ/bin/node",
  "runtimeArgs": ["./node_modules/vite/bin/vite.js"],
  "port": 5173
}
EOF
      info "snippet copied to clipboard (pbcopy)"
    fi
    note_issue
  else
    fail "launch.json has no \"$LAUNCH_NAME_NEW\" entry"
    note_issue
  fi
else
  warn "$LAUNCH not found (Claude Code preview won't work)"
  note_issue
fi

# --- Summary ---
section "Summary"
if [[ $ISSUES -eq 0 ]]; then
  printf "%sAll green.%s Run %spnpm --filter @rollout/demo dev%s or use Claude Code preview.\n" "$GRN" "$RST" "$CYA" "$RST"
  exit 0
else
  printf "%s%d issue(s) need attention.%s See above.\n" "$YLW" "$ISSUES" "$RST"
  exit 1
fi
