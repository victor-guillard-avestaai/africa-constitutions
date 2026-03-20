# Constitutions d'Afrique — Development commands

UV = uv run

.PHONY: review review-full review-deep check lint format open clean help

# ─── Review ─────────────────────────────────────────────────
review:          ## Quick review: L0+L1 (~5s)
	@bash scripts/review.sh

review-full:     ## Full review: L0+L1+L2 (~1-2m)
	@bash scripts/review.sh --full

review-deep:     ## Deep review: L0+L1+L2+L3
	@bash scripts/review.sh --deep

# ─── Code quality ──────────────────────────────────────────
lint:            ## Lint Python files (ruff)
	@$(UV) ruff check scripts/ --fix

format:          ## Format Python files (ruff)
	@$(UV) ruff format scripts/ notebooks/

check:           ## Syntax check (JS + DATA JSON + Python lint)
	@node -e "new Function(require('fs').readFileSync('src/data.js','utf8'))" && echo "data.js: OK"
	@node -e "new Function('d3','DATA','document','window','getComputedStyle',require('fs').readFileSync('src/app.js','utf8'))" && echo "app.js: OK"
	@python3 -c "import json; d=json.loads(open('src/data.js').read().split('const DATA = ')[1].rstrip(';\n')); print(f'DATA: {len(d[\"features\"])} features, {len(d[\"feature_matrix\"])} countries')"
	@$(UV) ruff check scripts/ --quiet && echo "Python lint: OK"

# ─── Development ────────────────────────────────────────────
open:            ## Open in default browser
	@xdg-open src/index.html 2>/dev/null || open src/index.html 2>/dev/null || echo "Open src/index.html in your browser"

# ─── Cleanup ────────────────────────────────────────────────
clean:           ## Remove generated/backup files
	@rm -f src/*.bak src/*.dark-backup
	@rm -rf data/constitution_corpus/ data/preamble_corpus/
	@rm -rf __pycache__ scripts/__pycache__
	@echo "Cleaned"

# ─── Help ───────────────────────────────────────────────────
help:            ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'
