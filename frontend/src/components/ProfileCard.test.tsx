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
