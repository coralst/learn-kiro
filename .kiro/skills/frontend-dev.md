---
inclusion: fileMatch
fileMatchPattern: "frontend/**/*.tsx,frontend/**/*.ts,frontend/**/*.jsx,frontend/**/*.css,src/**/*.tsx,src/**/*.ts,src/**/*.jsx"
---

# Frontend Development Skill

You are a senior frontend engineer working on a romantic agents app with React and TypeScript.

## Project Structure

```
frontend/
  src/
    components/       # Reusable UI components
    pages/            # Route-level page components
    hooks/            # Custom React hooks
    services/         # API client and external integrations
    types/            # Shared TypeScript types and interfaces
    utils/            # Pure helper functions
    __test-utils__/   # Shared test utilities and mocks
```

## React Patterns

- Functional components only — no class components
- Use named exports, not default exports
- One component per file, file name matches component name
- Keep components small: if it exceeds ~150 lines, split it
- Colocate related files: `Button.tsx`, `Button.test.tsx`, `Button.module.css`

```tsx
export function ProfileCard({ profile, onLike }: ProfileCardProps) {
  // ...
}
```

## TypeScript Conventions

- Strict mode enabled (`"strict": true` in tsconfig)
- Prefer `interface` for component props, `type` for unions and utility types
- No `any` — use `unknown` and narrow with type guards when needed
- Define props interfaces next to the component:
  ```tsx
  interface ProfileCardProps {
    profile: UserProfile;
    onLike: (profileId: string) => void;
  }
  ```

## State Management

- Local state with `useState` for component-scoped data
- `useReducer` for complex state transitions
- Context for cross-cutting concerns (auth, theme) — not for everything
- Avoid prop drilling beyond 2 levels; use composition or context
- Server state via React Query / TanStack Query when applicable

## Hooks

- Custom hooks for reusable logic: `useProfile()`, `useMatchScore()`
- Hooks start with `use` prefix
- Keep hooks focused — one concern per hook
- Extract side effects into hooks, keep components declarative

## Error Handling

- Error boundaries for component tree failures
- Handle loading, error, and empty states explicitly in every data-fetching component
- Show user-friendly error messages, log technical details to console
- Never swallow errors silently

## Performance

- Memoize expensive computations with `useMemo`
- Stabilize callback references with `useCallback` when passed as props
- Lazy load routes and heavy components with `React.lazy` + `Suspense`
- Avoid unnecessary re-renders: keep state as local as possible

## Accessibility

- Semantic HTML elements (`button`, `nav`, `main`, `section`)
- All interactive elements keyboard-accessible
- `aria-label` on icon-only buttons
- Form inputs have associated `label` elements
- Color contrast meets WCAG AA minimum
- Focus management on route changes and modals

## Styling

- CSS Modules or Tailwind — no inline styles for layout
- Responsive design: mobile-first approach
- Design tokens for colors, spacing, typography (no magic numbers)
- Dark mode support via CSS custom properties when applicable
