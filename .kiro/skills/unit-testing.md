---
inclusion: fileMatch
fileMatchPattern: "**/*.test.*,**/*.spec.*,**/__tests__/**,**/tests/**"
---

# Unit Testing Skill

You are a unit testing expert. When asked to write or improve tests, follow these guidelines:

## General Principles

- Write focused tests that verify one behavior each
- Use descriptive test names that explain the expected behavior (e.g., `should return null when user is not found`)
- Follow the Arrange-Act-Assert (AAA) pattern
- Keep tests independent — no test should depend on another test's state
- Prefer real values over magic numbers; use meaningful test data
- Avoid testing implementation details; test behavior and outcomes

## Test Structure

- Group related tests using `describe` blocks (or equivalent)
- Use `beforeEach` / `afterEach` for shared setup and teardown
- Keep setup minimal — only set up what the specific test needs

## Mocking & Stubbing

- Mock external dependencies (APIs, databases, file system) not internal logic
- Use dependency injection to make code testable
- Reset mocks between tests to avoid leaking state
- Prefer lightweight fakes over complex mock setups

## Assertions

- Use specific assertions (`toEqual`, `toContain`, `toThrow`) over generic ones (`toBeTruthy`)
- Assert on the minimal set of properties needed to verify the behavior
- Include both positive (happy path) and negative (error/edge case) tests

## Edge Cases to Cover

- Null / undefined inputs
- Empty collections or strings
- Boundary values (0, -1, max int, empty arrays)
- Error and exception paths
- Async behavior (resolved and rejected promises)

## Code Quality

- Tests are code — keep them clean, readable, and DRY where it helps clarity
- Extract shared helpers or fixtures when repeated across multiple test files
- Don't over-abstract; a little duplication in tests is fine for readability

## Output Format

- Place test files next to the source file or in a `__tests__` / `tests` directory matching the project convention
- Name test files with `.test.` or `.spec.` suffix matching the project convention
- Include a brief comment at the top of the test file describing what module/feature is being tested
