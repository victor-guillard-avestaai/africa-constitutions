#!/usr/bin/env bash
# Definition of Done check — runs at Stop via .claude/settings.json hook.
# Blocks session end if lint fails or uncommitted changes exist.
set -u

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# 1. Check if any Python files were changed
CHANGED=$(git diff --name-only 2>/dev/null; git diff --cached --name-only 2>/dev/null; git ls-files --others --exclude-standard 2>/dev/null)
PY_CHANGED=$(echo "$CHANGED" | grep -E '\.py$' || true)

if [ -z "$PY_CHANGED" ] && [ -z "$(git status --porcelain 2>/dev/null)" ]; then
    exit 0  # No changes at all — DOD not required
fi

# 2. Lint check (Python files only)
if [ -n "$PY_CHANGED" ]; then
    if ! uv run ruff check scripts/ 2>/dev/null; then
        echo "BLOCKED: ruff lint errors. Run: uv run ruff check --fix scripts/" >&2
        exit 2
    fi
fi

# 3. Uncommitted changes check
UNCOMMITTED=$(git status --porcelain 2>/dev/null)
if [ -n "$UNCOMMITTED" ]; then
    echo "BLOCKED: uncommitted changes. Commit or stash before ending session." >&2
    echo "$UNCOMMITTED" | head -10 >&2
    exit 2
fi

exit 0
