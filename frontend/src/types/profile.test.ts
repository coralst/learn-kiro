import { describe, it, expect } from 'vitest';
import { isValidUserProfile } from './profile';

describe('isValidUserProfile', () => {
  it('accepts a valid profile with all fields', () => {
    expect(
      isValidUserProfile({
        id: 'u1',
        displayName: 'Alice',
        avatarUrl: 'https://example.com/avatar.png',
        bio: 'Hello world',
      }),
    ).toBe(true);
  });

  it('accepts a valid profile with only required fields', () => {
    expect(isValidUserProfile({ id: 'u1', displayName: 'Bob' })).toBe(true);
  });

  it('rejects empty id', () => {
    expect(isValidUserProfile({ id: '', displayName: 'Alice' })).toBe(false);
  });

  it('rejects empty displayName', () => {
    expect(isValidUserProfile({ id: 'u1', displayName: '' })).toBe(false);
  });

  it('rejects whitespace-only displayName', () => {
    expect(isValidUserProfile({ id: 'u1', displayName: '   ' })).toBe(false);
  });

  it('rejects invalid avatarUrl', () => {
    expect(
      isValidUserProfile({ id: 'u1', displayName: 'Alice', avatarUrl: 'not-a-url' }),
    ).toBe(false);
  });

  it('accepts valid avatarUrl', () => {
    expect(
      isValidUserProfile({
        id: 'u1',
        displayName: 'Alice',
        avatarUrl: 'https://cdn.example.com/img.jpg',
      }),
    ).toBe(true);
  });

  it('rejects null', () => {
    expect(isValidUserProfile(null)).toBe(false);
  });

  it('rejects non-object values', () => {
    expect(isValidUserProfile('string')).toBe(false);
    expect(isValidUserProfile(42)).toBe(false);
    expect(isValidUserProfile(undefined)).toBe(false);
  });

  it('rejects non-string bio', () => {
    expect(isValidUserProfile({ id: 'u1', displayName: 'Alice', bio: 123 })).toBe(false);
  });
});
