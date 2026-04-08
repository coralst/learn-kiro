/** Represents a user's profile data for display in ProfileCard. */
export interface UserProfile {
  /** Unique user identifier. */
  id: string;
  /** User's display name. */
  displayName: string;
  /** URL to the user's avatar image. Optional — fallback shown when missing. */
  avatarUrl?: string;
  /** Short bio text. Optional — section hidden when missing. */
  bio?: string;
}

/**
 * Validates whether a value conforms to the UserProfile contract.
 *
 * - `id` must be a non-empty string.
 * - `displayName` must be a non-empty string after trimming whitespace.
 * - `avatarUrl`, when present, must be a valid URL.
 */
export function isValidUserProfile(profile: unknown): profile is UserProfile {
  if (typeof profile !== 'object' || profile === null) {
    return false;
  }

  const { id, displayName, avatarUrl } = profile as Record<string, unknown>;

  if (typeof id !== 'string' || id.length === 0) {
    return false;
  }

  if (typeof displayName !== 'string' || displayName.trim().length === 0) {
    return false;
  }

  if (avatarUrl !== undefined) {
    if (typeof avatarUrl !== 'string') {
      return false;
    }
    try {
      new URL(avatarUrl);
    } catch {
      return false;
    }
  }

  const { bio } = profile as Record<string, unknown>;
  if (bio !== undefined && typeof bio !== 'string') {
    return false;
  }

  return true;
}
