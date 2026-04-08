---
inclusion: always
---

# Romantic Agents — Project Standards

## Git Workflow (STRICT)

- NEVER commit directly to `main`. Always use feature branches.
- Branch naming: `feat/<short-description>`, `fix/<short-description>`, `chore/<short-description>`
- Commit messages MUST follow Conventional Commits:
  - `feat: add matchmaker scoring logic`
  - `fix: handle empty profile gracefully`
  - `chore: update dependencies`
  - `refactor: simplify compatibility tool`
  - `test: add coach conversation tests`
- Prefer small, focused commits — commit early and often as you make progress.
- Each commit should ideally represent one logical step (a feature, a fix, a refactor).
- Avoid large commits that mix unrelated changes when possible.
- Before any commit, ensure:
  1. Code passes linting (`ruff check .`)
  2. Tests pass (`pytest`)
  3. No secrets or API keys in code
  4. Staged files are cohesive — all related to the same logical change
- PRs require at least a self-review checklist before merge.
- Squash merge to `main` preferred.

## Python Standards

- Python 3.12+
- Use `ruff` for linting and formatting
- Type hints on all function signatures
- Docstrings on all public functions (Google style)
- No wildcard imports
- Keep modules small and focused

## AgentCore Patterns

- All agents use `BedrockAgentCoreApp` wrapper with `@app.entrypoint`
- Agent system prompts live in dedicated prompt strings, not inline
- Tools defined in `src/tools/`, registered via Strands tool decorator
- Test locally with `agentcore invoke --dev` before any deploy
- Use `agentcore dev` for local development with hot reload

## Security

- No hardcoded credentials — use environment variables or AWS IAM
- Sanitize all user inputs before passing to agent prompts
- No PII in logs or commit messages
