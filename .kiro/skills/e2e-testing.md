---
inclusion: fileMatch
fileMatchPattern: "**/e2e/**/*.ts,**/playwright/**/*.ts,**/e2e/**/*.tsx,playwright.config.*"
---

# E2E Testing Skill (Playwright)

You are a Playwright e2e testing expert. When writing or improving end-to-end tests, follow these guidelines.

## Project Structure

```
e2e/
  fixtures/          # Custom fixtures and test setup
  pages/             # Page Object Models
  tests/             # Test files organized by feature
    auth/
    profile/
    matching/
  utils/             # Shared helpers (test data factories, etc.)
playwright.config.ts
```

## Page Object Model

- Every page or major component gets a Page Object in `e2e/pages/`:
  ```typescript
  export class ProfilePage {
    constructor(private page: Page) {}

    async navigate(userId: string) {
      await this.page.goto(`/profile/${userId}`);
    }

    async getBio() {
      return this.page.getByRole('region', { name: 'Bio' }).textContent();
    }

    async clickLike() {
      await this.page.getByRole('button', { name: 'Like' }).click();
    }
  }
  ```
- Page Objects encapsulate selectors and actions — tests read like user stories
- Never use raw selectors in test files; always go through Page Objects

## Selector Strategy (priority order)

1. `getByRole()` — preferred, mirrors how users and assistive tech see the page
2. `getByLabel()` — for form inputs
3. `getByText()` — for visible text content
4. `getByTestId()` — last resort, for elements without accessible roles
- Never use CSS selectors or XPath unless absolutely unavoidable
- Never use auto-generated class names as selectors

## Test Patterns

- One user flow per test — keep tests focused and independent
- Use descriptive test names that read like scenarios:
  ```typescript
  test('user can update their bio and see it on their profile', async ({ page }) => {
    // ...
  });
  ```
- Arrange-Act-Assert structure, same as unit tests
- Each test starts from a clean state — no dependencies between tests

## Test Isolation

- Use `beforeEach` for common setup (login, navigation)
- Use Playwright fixtures for reusable setup/teardown:
  ```typescript
  const test = base.extend<{ loggedInPage: Page }>({
    loggedInPage: async ({ page }, use) => {
      await loginAs(page, testUser);
      await use(page);
    },
  });
  ```
- Use API calls for test data setup when possible (faster than UI clicks)
- Clean up test data in `afterEach` or use isolated test accounts

## Waiting & Flakiness Prevention

- Never use `page.waitForTimeout()` — it's a flakiness magnet
- Use auto-waiting: Playwright actions auto-wait for elements to be actionable
- For dynamic content, use explicit assertions that auto-retry:
  ```typescript
  await expect(page.getByText('Match found')).toBeVisible();
  ```
- Use `expect.toPass()` for custom retry logic on flaky checks
- Set reasonable timeouts in config, not per-test

## Assertions

- Use Playwright's web-first assertions (`expect(locator)`) — they auto-retry
- Common patterns:
  ```typescript
  await expect(page.getByRole('heading')).toHaveText('Your Matches');
  await expect(page.getByRole('list')).toHaveCount(3);
  await expect(page).toHaveURL('/dashboard');
  ```
- Assert on user-visible outcomes, not implementation details

## Accessibility in E2E

- Use `getByRole()` selectors — if you can't find an element by role, the page has an a11y issue
- Run accessibility scans in key flows:
  ```typescript
  const violations = await new AxeBuilder({ page }).analyze();
  expect(violations.violations).toEqual([]);
  ```
- Test keyboard navigation for critical flows (tab order, enter/space activation)
- Test with reduced motion preference when animations are involved

## Configuration

- Run tests in CI with `--reporter=html` for failure screenshots
- Use `projects` in config for cross-browser testing (chromium, firefox, webkit)
- Keep local dev fast: default to chromium only, headed mode for debugging
- Use `--workers=auto` in CI, single worker locally for debugging
