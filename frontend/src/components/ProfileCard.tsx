import { useState } from 'react';
import type { UserProfile } from '../types/profile';
import styles from './ProfileCard.module.css';

const BIO_MAX_LENGTH = 160;

function truncateBio(bio: string): string {
  if (bio.length <= BIO_MAX_LENGTH) {
    return bio;
  }
  return bio.slice(0, BIO_MAX_LENGTH) + '…';
}

/** Fallback avatar shown when avatarUrl is missing or the image fails to load. */
const FallbackAvatar: React.FC = () => (
  <div className={styles.fallbackAvatar} role="img" aria-label="No photo available" />
);

/** Internal skeleton placeholder rendered during loading state. */
const ProfileCardSkeleton: React.FC<{ size: 'sm' | 'md' | 'lg' }> = ({ size }) => {
  return (
    <div className={[styles.skeleton, styles[size]].filter(Boolean).join(' ')}>
      <div className={styles.skeletonAvatar} />
      <div className={styles.skeletonName} />
      <div className={styles.skeletonBio} />
    </div>
  );
};

export interface ProfileCardProps {
  /** User profile data to display. */
  user?: UserProfile;
  /** Shows skeleton loading state when true. */
  isLoading?: boolean;
  /** Optional CSS class for layout overrides by parent. */
  className?: string;
  /** Optional size variant. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isLoading = false,
  className,
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);
  const rootClassName = [styles.card, styles[size], className].filter(Boolean).join(' ');

  if (isLoading) {
    return (
      <article className={rootClassName} aria-busy="true">
        <ProfileCardSkeleton size={size} />
      </article>
    );
  }

  if (!user) {
    return (
      <article className={rootClassName}>
        <div className={styles.emptyState}>
          <p>No profile data available.</p>
        </div>
      </article>
    );
  }

  const showFallback = !user.avatarUrl || imgError;

  return (
    <article className={rootClassName}>
      {showFallback ? (
        <FallbackAvatar />
      ) : (
        <img
          className={styles.avatar}
          src={user.avatarUrl}
          alt={`${user.displayName}'s avatar`}
          onError={() => setImgError(true)}
        />
      )}
      <h2 className={styles.name}>{user.displayName}</h2>
      {user.bio && (
        <p className={styles.bio}>{truncateBio(user.bio)}</p>
      )}
    </article>
  );
};
