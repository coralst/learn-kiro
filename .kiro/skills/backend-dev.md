---
inclusion: fileMatch
fileMatchPattern: "src/**/*.py,backend/**/*.py"
---

# Backend Development Skill

You are a senior Python backend engineer working on a romantic agents app built on AWS Bedrock AgentCore.

## Project Structure

```
src/
  agents/          # Agent entrypoints using BedrockAgentCoreApp
  tools/           # Strands tool functions
  prompts/         # System prompt strings (not inline)
  models/          # Data models and schemas
  utils/           # Shared helpers
```

## AgentCore Patterns

- Every agent uses `BedrockAgentCoreApp` with `@app.entrypoint`:
  ```python
  from bedrock_agentcore.app import BedrockAgentCoreApp

  app = BedrockAgentCoreApp()

  @app.entrypoint
  async def handler(input_text: str, **kwargs) -> str:
      ...
  ```
- System prompts live in `src/prompts/` as dedicated strings, never inline in agent code.
- Tools are defined in `src/tools/` and registered via the Strands `@tool` decorator:
  ```python
  from strands import tool

  @tool
  def calculate_compatibility(profile_a: dict, profile_b: dict) -> float:
      """Calculate compatibility score between two profiles."""
      ...
  ```

## Python Conventions

- Python 3.12+ features are encouraged (type parameter syntax, `match` statements)
- Type hints on every function signature, including return types
- Google-style docstrings on all public functions:
  ```python
  def score_profile(profile: dict, criteria: list[str]) -> float:
      """Score a user profile against given criteria.

      Args:
          profile: User profile dictionary with keys like 'interests', 'values'.
          criteria: List of criteria strings to evaluate against.

      Returns:
          A float score between 0.0 and 1.0.

      Raises:
          ValueError: If profile is empty or criteria list is empty.
      """
  ```
- No wildcard imports, no mutable default arguments
- Use `from __future__ import annotations` only if needed for forward refs

## Async Patterns

- Prefer `async def` for I/O-bound operations (API calls, DB queries, agent invocations)
- Use `asyncio.gather()` for concurrent independent operations
- Never mix sync blocking calls inside async functions — use `asyncio.to_thread()` if needed
- Always `await` coroutines; never fire-and-forget without explicit handling

## Error Handling

- Use specific exception types, never bare `except:`
- Wrap external calls (APIs, DB) in try/except with meaningful error messages
- Log errors with context (what was being attempted, relevant IDs)
- Return structured error responses, don't let exceptions bubble to users
- Use context managers (`with` statements) for resource cleanup

## Data Validation

- Validate inputs at function boundaries, especially tool inputs from agents
- Use Pydantic models for structured data when complexity warrants it
- Fail fast with clear error messages on invalid input
- Sanitize any user-provided text before passing to agent prompts

## Module Design

- Keep modules small and focused — one concern per file
- Prefer pure functions where possible for testability
- Dependencies flow inward: tools → models, agents → tools → models
- No circular imports — if you need one, restructure
