#!/usr/bin/env bash
# ──────────────────────────────────────────────
#  ONE Dating App — local setup script
#  Usage:  bash setup.sh
#          bash setup.sh --no-start   (skip dev server)
# ──────────────────────────────────────────────
set -euo pipefail

# ── Colours ────────────────────────────────────
RED='\033[0;31m'; GRN='\033[0;32m'; YLW='\033[0;33m'
BLU='\033[0;34m'; BLD='\033[1m'; RST='\033[0m'

ok()   { echo -e "${GRN}✔${RST}  $*"; }
info() { echo -e "${BLU}→${RST}  $*"; }
warn() { echo -e "${YLW}!${RST}  $*"; }
fail() { echo -e "${RED}✖${RST}  $*"; exit 1; }
hr()   { echo -e "${BLU}────────────────────────────────────────${RST}"; }

# ── Parse flags ────────────────────────────────
START_DEV=true
for arg in "$@"; do
  [[ "$arg" == "--no-start" ]] && START_DEV=false
done

# ── Banner ─────────────────────────────────────
[ -t 1 ] && clear
echo ""
echo -e "${BLD}  ONE Dating App — Local Setup${RST}"
echo -e "  ─────────────────────────────"
echo ""

# ── 1. Node.js check ───────────────────────────
hr
info "Checking Node.js…"

if ! command -v node &>/dev/null; then
  fail "Node.js not found. Install Node 18+ from https://nodejs.org and re-run."
fi

NODE_VERSION=$(node -e "process.stdout.write(process.version.replace('v',''))")
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)

if (( NODE_MAJOR < 18 )); then
  fail "Node.js v$NODE_VERSION found, but v18+ is required. Please upgrade."
fi

ok "Node.js v$NODE_VERSION"

# npm check
if ! command -v npm &>/dev/null; then
  fail "npm not found. It should ship with Node.js — try reinstalling Node."
fi

ok "npm $(npm -v)"

# ── 2. Install dependencies ────────────────────
hr
info "Installing dependencies (npm install)…"
npm install --prefer-offline 2>&1 | tail -3
ok "Dependencies ready"

# ── 3. Environment file ────────────────────────
hr
info "Checking .env file…"

if [ -f ".env" ]; then
  ok ".env already exists — skipping"
else
  if [ -f ".env.example" ]; then
    cp .env.example .env
    ok ".env created from .env.example"
    echo ""
    warn "Open .env and fill in your Firebase values to connect to a real project."
    warn "The app works without them — admin login uses dev credentials instead."
    echo ""
    echo -e "   ${BLD}Dev admin credentials (no Firebase needed):${RST}"
    echo -e "   Email    →  admin@one.dev"
    echo -e "   Password →  one@admin123"
    echo -e "   URL      →  http://localhost:5173/admin/login"
    echo ""
  else
    warn ".env.example not found — skipping .env setup"
  fi
fi

# ── 4. Quick build check (optional) ───────────────────────────
hr
info "Running a quick build check…"
if npm run build --silent 2>/dev/null; then
  ok "Build passed"
else
  warn "Build had warnings — check output above, but dev server should still work"
fi

# ── 5. Summary ────────────────────────────────
hr
echo ""
echo -e "${BLD}  Setup complete!${RST}"
echo ""
echo -e "  ${BLD}Commands:${RST}"
echo -e "  ${GRN}npm run dev${RST}      Start local dev server (hot-reload)"
echo -e "  ${GRN}npm run build${RST}    Production build → dist/"
echo -e "  ${GRN}npm run preview${RST}  Preview prod build at localhost:4173"
echo -e "  ${GRN}npm run deploy${RST}   Build + push to Firebase Hosting"
echo ""
echo -e "  ${BLD}Admin panel:${RST}"
echo -e "  http://localhost:5173/admin/login"
echo -e "  Email: admin@one.dev  ·  Password: one@admin123"
echo ""

# ── 6. Start dev server ────────────────────────
if [ "$START_DEV" = true ]; then
  hr
  info "Starting dev server… (Ctrl+C to stop)"
  echo ""
  npm run dev
fi
