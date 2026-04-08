import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfileCard } from './ProfileCard';
import type { UserProfile } from '../types/profile';

const fullUser: UserProfile = {
  id: 'u1',
  displayName: 'Ada Lovelace',
  avatarUrl: 'https://example.com/ada.jpg',
  bio: 'Pioneer of computing.',
};

describe('ProfileCard — happy-path rendering (Task 2.1)', () => {
  it('renders displayName as visible text', () => {
    render(<ProfileCard user={fullUser} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  });

  it('renders avatar image with avatarUrl as src', () => {
    render(<ProfileCard user={fullUser} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/ada.jpg');
  });

  it('renders bio text', () => {
    render(<ProfileCard user={fullUser} />);
    expect(screen.getByText('Pioneer of computing.')).toBeInTheDocument();
  });

  it('uses semantic article element as root', () => {
    const { container } = render(<ProfileCard user={fullUser} />);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders displayName in an h2 element', () => {
    render(<ProfileCard user={fullUser} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Ada Lovelace');
  });

  it('renders bio in a p element', () => {
    const { container } = render(<ProfileCard user={fullUser} />);
    const bio = container.querySelector('p');
    expect(bio).toHaveTextContent('Pioneer of computing.');
  });

  it('sets avatar alt attribute to include displayName', () => {
    render(<ProfileCard user={fullUser} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', expect.stringContaining('Ada Lovelace'));
  });

  it('truncates bio exceeding 160 characters with ellipsis', () => {
    const longBio = 'A'.repeat(200);
    const user: UserProfile = { ...fullUser, bio: longBio };
    render(<ProfileCard user={user} />);
    const expected = 'A'.repeat(160) + '\u2026';
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('does not truncate bio of exactly 160 characters', () => {
    const exactBio = 'B'.repeat(160);
    const user: UserProfile = { ...fullUser, bio: exactBio };
    render(<ProfileCard user={user} />);
    expect(screen.getByText(exactBio)).toBeInTheDocument();
  });

  it('does not truncate bio shorter than 160 characters', () => {
    const shortBio = 'Short bio.';
    const user: UserProfile = { ...fullUser, bio: shortBio };
    render(<ProfileCard user={user} />);
    expect(screen.getByText(shortBio)).toBeInTheDocument();
  });

  it('applies className prop alongside default card class', () => {
    const { container } = render(
      <ProfileCard user={fullUser} className="custom-layout" />,
    );
    const article = container.querySelector('article')!;
    expect(article.className).toContain('card');
    expect(article.className).toContain('custom-layout');
  });

  it('renders without className when none provided', () => {
    const { container } = render(<ProfileCard user={fullUser} />);
    const article = container.querySelector('article')!;
    expect(article.className).toContain('card');
    expect(article.className).not.toContain('undefined');
  });

  it('hides bio section when bio is absent', () => {
    const noBioUser: UserProfile = { id: 'u2', displayName: 'No Bio' };
    const { container } = render(<ProfileCard user={noBioUser} />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
});

describe('ProfileCard — loading skeleton state (Task 2.2)', () => {
  it('renders skeleton with aria-busy="true" when isLoading is true', () => {
    const { container } = render(<ProfileCard isLoading />);
    const article = container.querySelector('article')!;
    expect(article).toHaveAttribute('aria-busy', 'true');
  });

  it('renders skeleton placeholder divs for avatar, name, and bio', () => {
    const { container } = render(<ProfileCard isLoading />);
    expect(container.querySelector('.skeletonAvatar')).toBeInTheDocument();
    expect(container.querySelector('.skeletonName')).toBeInTheDocument();
    expect(container.querySelector('.skeletonBio')).toBeInTheDocument();
  });

  it('does not render user content when isLoading is true', () => {
    render(<ProfileCard user={fullUser} isLoading />);
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('Pioneer of computing.')).not.toBeInTheDocument();
  });

  it('does not set aria-busy when isLoading is false', () => {
    const { container } = render(<ProfileCard user={fullUser} />);
    const article = container.querySelector('article')!;
    expect(article).not.toHaveAttribute('aria-busy');
  });

  it('renders skeleton inside the card container', () => {
    const { container } = render(<ProfileCard isLoading />);
    const article = container.querySelector('article')!;
    expect(article.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('applies size variant class to skeleton wrapper', () => {
    const { container } = render(<ProfileCard isLoading size="lg" />);
    const skeleton = container.querySelector('.skeleton')!;
    expect(skeleton.className).toContain('lg');
  });

  it('defaults to md size on skeleton when no size provided', () => {
    const { container } = render(<ProfileCard isLoading />);
    const skeleton = container.querySelector('.skeleton')!;
    expect(skeleton.className).toContain('md');
  });

  it('does not render skeleton when isLoading is false', () => {
    const { container } = render(<ProfileCard user={fullUser} />);
    expect(container.querySelector('.skeleton')).not.toBeInTheDocument();
  });
});

describe('ProfileCard — size variant support (Task 2.4)', () => {
  it('applies sm CSS class when size="sm"', () => {
    const { container } = render(<ProfileCard user={fullUser} size="sm" />);
    const article = container.querySelector('article')!;
    expect(article.className).toContain('sm');
  });

  it('applies md CSS class when size="md"', () => {
    const { container } = render(<ProfileCard user={fullUser} size="md" />);
    const article = container.querySelector('article')!;
    expect(article.className).toContain('md');
  });

  it('applies lg CSS class when size="lg"', () => {
    const { container } = render(<ProfileCard user={fullUser} size="lg" />);
    const article = container.querySelector('article')!;
    expect(article.className).toContain('lg');
  });

  it('defaults to md CSS class when no size prop is provided', () => {
    const { container } = render(<ProfileCard user={fullUser} />);
    const article = container.querySelector('article')!;
    expect(article.className).toContain('md');
  });

  it('applies size class alongside card class', () => {
    const { container } = render(<ProfileCard user={fullUser} size="lg" />);
    const article = container.querySelector('article')!;
    expect(article.className).toContain('card');
    expect(article.className).toContain('lg');
  });
});

import fc from 'fast-check';

/**
 * Property 1: Profile data rendering completeness
 *
 * For any valid UserProfile with all fields populated, the rendered output
 * contains displayName text, an image with avatarUrl src, and bio text.
 *
 * **Validates: Requirements 1.1, 1.2, 1.3**
 */
describe('ProfileCard — Property 1: Profile data rendering completeness (Task 5.2)', () => {
  const arbUserProfile = fc.record({
    id: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
    displayName: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
    avatarUrl: fc.webUrl().map((url) => `${url}/avatar.png`),
    bio: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
  });

  it('renders displayName, avatar image with correct src, and bio for any valid profile', () => {
    fc.assert(
      fc.property(arbUserProfile, (user) => {
        const { container, unmount } = render(<ProfileCard user={user} />);

        // Requirement 1.1 — displayName is visible
        const heading = container.querySelector('h2');
        expect(heading).not.toBeNull();
        expect(heading!.textContent).toBe(user.displayName);

        // Requirement 1.2 — avatar image has avatarUrl as src
        const img = container.querySelector('img');
        expect(img).not.toBeNull();
        expect(img!.getAttribute('src')).toBe(user.avatarUrl);

        // Requirement 1.3 — bio text is present (possibly truncated)
        const expectedBio =
          user.bio!.length > 160 ? user.bio!.slice(0, 160) + '\u2026' : user.bio!;
        const bioEl = container.querySelector('p');
        expect(bioEl).not.toBeNull();
        expect(bioEl!.textContent).toBe(expectedBio);

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

import { fireEvent } from '@testing-library/react';

describe('ProfileCard — error and empty states (Task 2.3)', () => {
  it('renders fallback avatar when avatarUrl is missing', () => {
    const noAvatarUser: UserProfile = { id: 'u3', displayName: 'Grace Hopper' };
    const { container } = render(<ProfileCard user={noAvatarUser} />);
    const fallback = container.querySelector('.fallbackAvatar');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute('role', 'img');
    expect(fallback).toHaveAttribute('aria-label', 'No photo available');
  });

  it('does not render an img element when avatarUrl is missing', () => {
    const noAvatarUser: UserProfile = { id: 'u3', displayName: 'Grace Hopper' };
    render(<ProfileCard user={noAvatarUser} />);
    expect(screen.queryByRole('img', { name: /Grace Hopper/ })).not.toBeInTheDocument();
  });

  it('renders fallback avatar when image onError fires', () => {
    const user: UserProfile = {
      id: 'u4',
      displayName: 'Alan Turing',
      avatarUrl: 'https://example.com/broken.jpg',
    };
    const { container } = render(<ProfileCard user={user} />);
    const img = screen.getByRole('img', { name: /Alan Turing/ });
    fireEvent.error(img);
    const fallback = container.querySelector('.fallbackAvatar');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute('aria-label', 'No photo available');
  });

  it('removes the broken img element after onError fires', () => {
    const user: UserProfile = {
      id: 'u4',
      displayName: 'Alan Turing',
      avatarUrl: 'https://example.com/broken.jpg',
    };
    render(<ProfileCard user={user} />);
    const img = screen.getByRole('img', { name: /Alan Turing/ });
    fireEvent.error(img);
    expect(screen.queryByRole('img', { name: /Alan Turing/ })).not.toBeInTheDocument();
  });

  it('renders empty state when no user is provided and isLoading is false', () => {
    const { container } = render(<ProfileCard />);
    const emptyState = container.querySelector('.emptyState');
    expect(emptyState).toBeInTheDocument();
    expect(screen.getByText('No profile data available.')).toBeInTheDocument();
  });

  it('renders empty state inside an article element', () => {
    const { container } = render(<ProfileCard />);
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article!.querySelector('.emptyState')).toBeInTheDocument();
  });

  it('hides bio section when bio is absent (no empty p element)', () => {
    const noBioUser: UserProfile = { id: 'u5', displayName: 'No Bio User' };
    const { container } = render(<ProfileCard user={noBioUser} />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
});

import { isValidUserProfile } from '../types/profile';

/* ------------------------------------------------------------------ */
/* Shared arbitrary: valid UserProfile with all required fields        */
/* ------------------------------------------------------------------ */
const arbId = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
const arbDisplayName = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
const arbAvatarUrl = fc.webUrl().map((url) => `${url}/avatar.png`);
const arbBio = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

const arbFullUser = fc.record({
  id: arbId,
  displayName: arbDisplayName,
  avatarUrl: arbAvatarUrl,
  bio: arbBio,
});

const arbUserNoOptionals = fc.record({
  id: arbId,
  displayName: arbDisplayName,
});

/**
 * Property 2: Loading state hides user content
 *
 * For any UserProfile (including undefined), when isLoading is true,
 * skeleton renders with aria-busy and no user content appears.
 *
 * **Validates: Requirements 2.1, 2.4, 7.3**
 */
describe('ProfileCard — Property 2: Loading state hides user content (Task 5.3)', () => {
  const arbMaybeUser = fc.option(arbFullUser, { nil: undefined });

  it('renders skeleton with aria-busy and hides user content for any user when isLoading', () => {
    fc.assert(
      fc.property(arbMaybeUser, (user) => {
        const { container, unmount } = render(
          <ProfileCard user={user} isLoading />,
        );

        // Requirement 2.1 — skeleton renders instead of user content
        const article = container.querySelector('article')!;
        expect(article).not.toBeNull();

        // Requirement 2.4 / 7.3 — aria-busy is true
        expect(article.getAttribute('aria-busy')).toBe('true');

        // No user content should appear
        expect(container.querySelector('h2')).toBeNull();
        expect(container.querySelector('img')).toBeNull();
        expect(container.querySelector('p')).toBeNull();

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 3: Missing optional fields are gracefully omitted
 *
 * For any UserProfile without avatarUrl, fallback avatar renders.
 * For any UserProfile without bio, no bio section element exists.
 *
 * **Validates: Requirements 3.2, 4.2**
 */
describe('ProfileCard — Property 3: Missing optional fields gracefully omitted (Task 5.4)', () => {
  it('renders fallback avatar when avatarUrl is absent', () => {
    fc.assert(
      fc.property(arbUserNoOptionals, (user) => {
        const { container, unmount } = render(<ProfileCard user={user} />);

        // Requirement 3.2 — fallback avatar renders
        const fallback = container.querySelector('[role="img"][aria-label="No photo available"]');
        expect(fallback).not.toBeNull();

        // No <img> element should be present
        expect(container.querySelector('img')).toBeNull();

        unmount();
      }),
      { numRuns: 50 },
    );
  });

  it('hides bio section when bio is absent', () => {
    fc.assert(
      fc.property(arbUserNoOptionals, (user) => {
        const { container, unmount } = render(<ProfileCard user={user} />);

        // Requirement 4.2 — no bio paragraph element
        expect(container.querySelector('p')).toBeNull();

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 4: Bio truncation at 160 characters
 *
 * For any bio longer than 160 chars, displayed text is exactly
 * 160 chars + ellipsis. For bio ≤ 160 chars, full bio displayed.
 *
 * **Validates: Requirements 1.4, 8.4**
 */
describe('ProfileCard — Property 4: Bio truncation at 160 characters (Task 5.5)', () => {
  const arbLongBio = fc
    .string({ minLength: 161, maxLength: 500 })
    .filter((s) => s.trim().length > 0);
  const arbShortBio = fc
    .string({ minLength: 1, maxLength: 160 })
    .filter((s) => s.trim().length > 0);

  it('truncates bio longer than 160 chars to 160 + ellipsis', () => {
    fc.assert(
      fc.property(arbId, arbDisplayName, arbLongBio, (id, displayName, bio) => {
        const user: UserProfile = { id, displayName, avatarUrl: 'https://example.com/a.png', bio };
        const { container, unmount } = render(<ProfileCard user={user} />);

        const bioEl = container.querySelector('p');
        expect(bioEl).not.toBeNull();
        expect(bioEl!.textContent).toBe(bio.slice(0, 160) + '\u2026');

        unmount();
      }),
      { numRuns: 50 },
    );
  });

  it('displays full bio when 160 chars or fewer', () => {
    fc.assert(
      fc.property(arbId, arbDisplayName, arbShortBio, (id, displayName, bio) => {
        const user: UserProfile = { id, displayName, avatarUrl: 'https://example.com/a.png', bio };
        const { container, unmount } = render(<ProfileCard user={user} />);

        const bioEl = container.querySelector('p');
        expect(bioEl).not.toBeNull();
        expect(bioEl!.textContent).toBe(bio);

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 5: Size variant CSS class application
 *
 * For any valid size prop, the corresponding CSS class is applied.
 * When omitted, md class is applied.
 *
 * **Validates: Requirements 5.1, 5.2**
 */
describe('ProfileCard — Property 5: Size variant CSS class application (Task 5.6)', () => {
  const arbSize = fc.constantFrom('sm' as const, 'md' as const, 'lg' as const);

  it('applies the corresponding CSS class for any valid size prop', () => {
    fc.assert(
      fc.property(arbFullUser, arbSize, (user, size) => {
        const { container, unmount } = render(
          <ProfileCard user={user} size={size} />,
        );

        const article = container.querySelector('article')!;
        expect(article.className).toContain(size);

        unmount();
      }),
      { numRuns: 50 },
    );
  });

  it('defaults to md class when size prop is omitted', () => {
    fc.assert(
      fc.property(arbFullUser, (user) => {
        const { container, unmount } = render(<ProfileCard user={user} />);

        const article = container.querySelector('article')!;
        expect(article.className).toContain('md');

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 6: className prop forwarding
 *
 * For any className string, the root element contains both the provided
 * className and the default CSS module class.
 *
 * **Validates: Requirement 6.1**
 */
describe('ProfileCard — Property 6: className prop forwarding (Task 5.7)', () => {
  const arbClassName = fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s));

  it('root element contains both provided className and default card class', () => {
    fc.assert(
      fc.property(arbFullUser, arbClassName, (user, customClass) => {
        const { container, unmount } = render(
          <ProfileCard user={user} className={customClass} />,
        );

        const article = container.querySelector('article')!;
        expect(article.className).toContain('card');
        expect(article.className).toContain(customClass);

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 7: Avatar alt attribute contains displayName
 *
 * For any valid UserProfile, the avatar image alt attribute contains
 * the user's displayName.
 *
 * **Validates: Requirement 7.1**
 */
describe('ProfileCard — Property 7: Avatar alt attribute contains displayName (Task 5.8)', () => {
  it('avatar img alt contains displayName for any valid profile with avatarUrl', () => {
    fc.assert(
      fc.property(arbFullUser, (user) => {
        const { container, unmount } = render(<ProfileCard user={user} />);

        const img = container.querySelector('img');
        expect(img).not.toBeNull();
        expect(img!.getAttribute('alt')).toContain(user.displayName);

        unmount();
      }),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 8: UserProfile validation
 *
 * Empty and whitespace-only strings are rejected for id and displayName.
 * Only valid URL strings accepted for avatarUrl.
 *
 * **Validates: Requirements 8.1, 8.2, 8.3**
 */
describe('ProfileCard — Property 8: UserProfile validation (Task 5.9)', () => {
  const arbWhitespace = fc
    .array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 1 })
    .map((chars) => chars.join(''));

  it('rejects empty string for id', () => {
    fc.assert(
      fc.property(arbDisplayName, (displayName) => {
        expect(isValidUserProfile({ id: '', displayName })).toBe(false);
      }),
      { numRuns: 50 },
    );
  });

  it('rejects whitespace-only string for displayName', () => {
    fc.assert(
      fc.property(arbId, arbWhitespace, (id, displayName) => {
        expect(isValidUserProfile({ id, displayName })).toBe(false);
      }),
      { numRuns: 50 },
    );
  });

  it('rejects empty string for displayName', () => {
    fc.assert(
      fc.property(arbId, (id) => {
        expect(isValidUserProfile({ id, displayName: '' })).toBe(false);
      }),
      { numRuns: 50 },
    );
  });

  it('accepts valid URL for avatarUrl', () => {
    fc.assert(
      fc.property(arbId, arbDisplayName, arbAvatarUrl, (id, displayName, avatarUrl) => {
        expect(isValidUserProfile({ id, displayName, avatarUrl })).toBe(true);
      }),
      { numRuns: 50 },
    );
  });

  it('rejects invalid URL strings for avatarUrl', () => {
    const arbInvalidUrl = fc
      .string({ minLength: 1 })
      .filter((s) => {
        try {
          new URL(s);
          return false;
        } catch {
          return true;
        }
      });

    fc.assert(
      fc.property(arbId, arbDisplayName, arbInvalidUrl, (id, displayName, avatarUrl) => {
        expect(isValidUserProfile({ id, displayName, avatarUrl })).toBe(false);
      }),
      { numRuns: 50 },
    );
  });
});
