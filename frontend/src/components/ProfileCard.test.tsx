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
