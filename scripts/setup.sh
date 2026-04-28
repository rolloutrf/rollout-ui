#!/usr/bin/env bash
# First-run installer for rollout-ui. Idempotent.
# Installs nvm-managed Node, activates pnpm via corepack, installs deps,
# then defers to scripts/preflight.sh for verification.
#
# Usage:  bash scripts/setup.sh

set -uo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_REQ="22.21.1"
PNPM_REQ="10.32.1"

if [[ -t 1 ]]; then
  GRN=$'\033[32m'; YLW=$'\033[33m'; CYA=$'\033[36m'; BLD=$'\033[1m'; RST=$'\033[0m'
else
  GRN=""; YLW=""; CYA=""; BLD=""; RST=""
fi

step() { printf "\n%s>>>%s %s%s%s\n" "$CYA" "$RST" "$BLD" "$1" "$RST"; }
note() { printf "    %s\n" "$1"; }
fail() { printf "    %sERROR%s %s\n" "$YLW" "$RST" "$1"; }

# 1. nvm
step "Checking nvm"
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck disable=SC1091
  source "$NVM_DIR/nvm.sh"
  note "nvm $(nvm --version) found at $NVM_DIR"
else
  fail "nvm not installed. Run:"
  note "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash"
  note "Then restart your shell and re-run this script."
  exit 1
fi

# 2. Node
step "Ensuring Node v$NODE_REQ"
if nvm ls "$NODE_REQ" >/dev/null 2>&1 && nvm ls "$NODE_REQ" | grep -q "v$NODE_REQ"; then
  note "Node v$NODE_REQ already installed"
else
  note "Installing Node v$NODE_REQ via nvm…"
  nvm install "$NODE_REQ" || { fail "nvm install failed"; exit 1; }
fi
nvm use "$NODE_REQ" >/dev/null
nvm alias default "$NODE_REQ" >/dev/null
note "Active: $(node -v)"

# 3. corepack + pnpm
step "Activating pnpm@$PNPM_REQ via corepack"
if command -v corepack >/dev/null 2>&1; then
  corepack enable >/dev/null 2>&1 || true
  corepack prepare "pnpm@$PNPM_REQ" --activate >/dev/null 2>&1 || {
    fail "corepack prepare failed; trying npm install -g pnpm@$PNPM_REQ"
    npm install -g "pnpm@$PNPM_REQ" || { fail "could not install pnpm"; exit 1; }
  }
  note "pnpm: $(pnpm -v)"
else
  fail "corepack missing in this Node install"
  exit 1
fi

# 4. install
step "Installing dependencies"
if [[ ! -d "$REPO_DIR/.git" ]]; then
  fail "$REPO_DIR is not a git checkout. Clone first:"
  note "  git clone https://github.com/rolloutrf/rollout-ui.git \"$REPO_DIR\""
  exit 1
fi
( cd "$REPO_DIR" && pnpm install ) || { fail "pnpm install failed"; exit 1; }
note "Dependencies installed."

# 5. preflight
step "Running preflight"
bash "$REPO_DIR/scripts/preflight.sh" || {
  printf "\n%sSetup finished, but preflight reported issues above.%s\n" "$YLW" "$RST"
  exit 1
}

printf "\n%sSetup complete.%s Try: %spnpm --filter @rollout/demo dev%s\n" "$GRN" "$RST" "$CYA" "$RST"
