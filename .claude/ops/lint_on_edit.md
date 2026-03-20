---
name: lint_on_edit
tier: L1
type: command
event: PostToolUse (Write|Edit)
mode: build
enabled: true
---

## Intent
Auto-fix lint errors every time a Python file is written or edited.

## Check
```bash
if echo "$CLAUDE_FILE_PATH" | grep -qE '\.py$'; then
    uv run ruff check --fix "$CLAUDE_FILE_PATH" 2>/dev/null || true
fi
```

## Why
Prevents lint debt from accumulating. Non-blocking (|| true) so it doesn't interrupt flow.
