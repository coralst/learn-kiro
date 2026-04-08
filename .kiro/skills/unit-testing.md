---
inclusion: fileMatch
fileMatchPattern: "**/*.test.*,**/*.spec.*,**/__tests__/**,**/tests/**,**/test_*"
---

# Unit Testing Skill

You are a unit testing expert. When asked to write or improve tests, follow these guidelines:

## Project Test Organization

### Python (Backend)

- All tests live in a top-level `tests/` directory, mirroring the `src/` structure:
  ```
  backend/
    src/
      agents/
      tools/
      api/
    tests/
      conftest.py              # project-wide fixtures (db, auth mocks)
      agents/
        conftest.py            # agent-specific fixtures
        test_coach.py
      tools/
        conftest.py            # tool-specific fixtures
        test_matchmaker.py
      api/
        conftest.py            # API fixtures (test client, etc.)
        test_endpoints.py
  ```
- Use `conftest.py` files at each directory level to scope fixtures. A fixture in `tests/conftest.py` is available to all tests; one in `tests/api/conftest.py` is only available to API tests.
- Never put all fixtures in a single `conftest.py` — scope them to the test subdirectory that needs them.
- Test files use the `test_` prefix (e.g., `test_matchmaker.py`).
- Test functions use the `test_` prefix (e.g., `def test_score_returns_zero_for_empty_profile`).

### TypeScript / JavaScript (Frontend)

- Colocate test files next to the source file they test:
  ```
  frontend/
    src/
      components/
        Button.tsx
        Button.test.tsx
      pages/
        Home.tsx
        Home.test.tsx
  ```
- Use `.test.ts` / `.test.tsx` suffix (not `.spec.`).
- Shared test utilities go in a `src/__test-utils__/` directory.

### Mixed Projects

- Backend and frontend each own their test setup independently — different runners (pytest vs vitest/jest), separate configs.
- Do not mix Python and JS/TS tests in the same directory tree.

## General Principles

- Write focused tests that verify one behavior each
- Use descriptive test names that explain the expected behavior
  - Python: `def test_returns_none_when_user_not_found`
  - JS/TS: `it('should return null when user is not found')`
- Follow the Arrange-Act-Assert (AAA) pattern
- Keep tests independent — no test should depend on another test's state
- Prefer real values over magic numbers; use meaningful test data
- Avoid testing implementation details; test behavior and outcomes

## Test Structure

- Python: group related tests in classes (`class TestMatchmaker:`) or by module
- JS/TS: group related tests using `describe` blocks
- Use `beforeEach` / `afterEach` (JS) or fixtures (Python) for shared setup
- Keep setup minimal — only set up what the specific test needs

## Mocking & Stubbing

- Mock external dependencies (APIs, databases, file system) not internal logic
- Python: use `unittest.mock.patch` or `pytest-mock`; prefer fixtures for dependency injection
- JS/TS: use `vi.mock()` / `jest.mock()` for module mocks
- Reset mocks between tests to avoid leaking state
- Prefer lightweight fakes over complex mock setups

## Assertions

- Python: use plain `assert` statements with clear comparisons; use `pytest.raises` for exceptions
- JS/TS: use specific matchers (`toEqual`, `toContain`, `toThrow`) over generic ones (`toBeTruthy`)
- Assert on the minimal set of properties needed to verify the behavior
- Include both positive (happy path) and negative (error/edge case) tests

## Edge Cases to Cover

- None / null / undefined inputs
- Empty collections or strings
- Boundary values (0, -1, max int, empty arrays)
- Error and exception paths
- Async behavior (Python: `pytest-asyncio`; JS/TS: resolved and rejected promises)

## Code Quality

- Tests are code — keep them clean, readable, and DRY where it helps clarity
- Extract shared helpers or fixtures when repeated across multiple test files
- Don't over-abstract; a little duplication in tests is fine for readability
- Include a brief docstring/comment at the top of each test file describing what module is being tested
