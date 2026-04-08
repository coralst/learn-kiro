# Implementation Plan: ProfileCard Component

## Overview

Build a reusable ProfileCard React component with TypeScript, CSS Modules styling, and comprehensive tests. Each task is a logical commit on the `feat/refine-workflow` branch. The component supports loading/error/empty states, three size variants, and meets WCAG AA accessibility standards.

## Tasks

- [x] 1. Define UserProfile type and validation utilities
  - Create `frontend/src/types/profile.ts`
  - Define the `UserProfile` interface with `id`, `displayName`, optional `avatarUrl`, and optional `bio`
  - Implement `isValidUserProfile` validation helper enforcing non-empty `id`, non-empty trimmed `displayName`, and valid URL for `avatarUrl` when present
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 2. Implement ProfileCard component with all states
  - [x] 2.1 Create ProfileCard component with happy-path rendering
    - Create `frontend/src/components/ProfileCard.tsx`
    - Implement `ProfileCardProps` interface with `user?`, `isLoading?`, `className?`, `size?` props
    - Render avatar image, displayName, and bio from `UserProfile`
    - Truncate bio to 160 characters with ellipsis when exceeded
    - Apply `className` prop to root element alongside default CSS module class
    - Use semantic HTML (`article`, `img`, `h2`/`h3`, `p`)
    - Set avatar `alt` attribute to include the user's displayName
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.1, 6.2, 7.1, 7.4, 8.4_

  - [x] 2.2 Implement loading skeleton state
    - Create internal `ProfileCardSkeleton` component within the same file
    - Render animated placeholder shapes for avatar, name, and bio areas
    - Match skeleton dimensions to the active size variant
    - Set `aria-busy="true"` on the card container when loading
    - Render skeleton instead of user content when `isLoading` is true
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 7.3_

  - [x] 2.3 Implement error and empty states
    - Show fallback avatar when `avatarUrl` is missing or image `onError` fires
    - Set appropriate alt text on fallback avatar indicating no photo available
    - Render empty state when no `user` is provided and `isLoading` is false
    - Hide bio section entirely when bio is absent (no empty element)
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 7.2_

  - [x] 2.4 Implement size variant support
    - Support `sm`, `md`, `lg` size props
    - Default to `md` when no size prop is provided
    - Apply corresponding CSS class for each size variant to the root element
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 3. Create CSS Modules styles
  - Create `frontend/src/components/ProfileCard.module.css`
  - Define base `.card` styles with semantic structure
  - Define `.sm`, `.md`, `.lg` variant classes with appropriate dimensions and typography scale
  - Add `.skeleton` and pulse animation styles for loading state
  - Add `.fallbackAvatar` and `.emptyState` styles
  - Ensure text color contrast meets WCAG AA against card background
  - _Requirements: 5.2, 5.3, 7.5_

- [x] 4. Checkpoint — Verify component renders correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Write component tests
  - [x] 5.1 Write core unit tests for ProfileCard
    - Create `frontend/src/components/ProfileCard.test.tsx`
    - Test happy-path rendering: displayName, avatar image src, bio text visible
    - Test loading state renders skeleton with `aria-busy="true"` and hides user content
    - Test empty state renders when no user and not loading
    - Test fallback avatar on missing `avatarUrl`
    - Test fallback avatar on image `onError`
    - Test bio truncation at 160 characters with ellipsis
    - Test size variant CSS class application and `md` default
    - Test `className` prop forwarding to root element
    - Test alt attribute contains displayName
    - Test bio section hidden when bio is absent
    - _Requirements: 1.1–1.4, 2.1, 2.4, 3.1, 3.2, 4.1, 4.2, 5.1, 5.2, 6.1, 7.1, 7.2, 7.3_

  - [x] 5.2 Write property test: Profile data rendering completeness (Property 1)
    - **Property 1: Profile data rendering completeness**
    - For any valid UserProfile with all fields populated, the rendered output contains displayName text, an image with avatarUrl src, and bio text
    - **Validates: Requirements 1.1, 1.2, 1.3**

  - [x] 5.3 Write property test: Loading state hides user content (Property 2)
    - **Property 2: Loading state hides user content**
    - For any UserProfile (including undefined), when isLoading is true, skeleton renders with aria-busy and no user content appears
    - **Validates: Requirements 2.1, 2.4, 7.3**

  - [x] 5.4 Write property test: Missing optional fields gracefully omitted (Property 3)
    - **Property 3: Missing optional fields are gracefully omitted**
    - For any UserProfile without avatarUrl, fallback avatar renders. For any UserProfile without bio, no bio section element exists
    - **Validates: Requirements 3.2, 4.2**

  - [x] 5.5 Write property test: Bio truncation at 160 characters (Property 4)
    - **Property 4: Bio truncation at 160 characters**
    - For any bio longer than 160 chars, displayed text is exactly 160 chars + ellipsis. For bio ≤ 160 chars, full bio displayed
    - **Validates: Requirements 1.4, 8.4**

  - [x] 5.6 Write property test: Size variant CSS class application (Property 5)
    - **Property 5: Size variant CSS class application**
    - For any valid size prop, the corresponding CSS class is applied. When omitted, md class is applied
    - **Validates: Requirements 5.1, 5.2**

  - [x] 5.7 Write property test: className prop forwarding (Property 6)
    - **Property 6: className prop forwarding**
    - For any className string, the root element contains both the provided className and the default CSS module class
    - **Validates: Requirement 6.1**

  - [x] 5.8 Write property test: Avatar alt attribute contains displayName (Property 7)
    - **Property 7: Avatar alt attribute contains displayName**
    - For any valid UserProfile, the avatar image alt attribute contains the user's displayName
    - **Validates: Requirement 7.1**

  - [x] 5.9 Write property test: UserProfile validation (Property 8)
    - **Property 8: UserProfile validation**
    - Empty and whitespace-only strings are rejected for id and displayName. Only valid URL strings accepted for avatarUrl
    - **Validates: Requirements 8.1, 8.2, 8.3**

- [x] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with `vitest` for generative testing
- Checkpoints ensure incremental validation
- All work stays on `feat/refine-workflow` — do not merge to main
