# Ops

Automated enforcement hooks. Configured in `.claude/settings.json`.

| Op | Event | Description |
|----|-------|-------------|
| lint_on_edit | PostToolUse (Write\|Edit) | Auto-fix ruff lint errors on Python files |
| tmp_cleanup | Stop | Block if tmp/ has unprocessed files |
| dod_enforcement | Stop | Lint + no uncommitted changes |
| findings_gate | Stop | Block if review findings not integrated into ROADMAP.md |
| session_baseline | SessionStart | Record git HEAD for session tracking |

See individual `.md` files for details.
