import type { UserProfile } from '../types/profile';
import styles from './ProfileCard.module.css';

const BIO_MAX_LENGTH = 160;

function truncateBio(bio: string): string {
  if (bio.length <= BIO_MAX_LENGTH) {
    return bio;
  }
  return bio.slice(0, BIO_MAX_LENGTH) + '…';
}

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
  className,
}) => {
  const rootClassName = [styles.card, className].filter(Boolean).join(' ');

  if (!user) {
    return <article className={rootClassName} />;
  }

  return (
    <article className={rootClassName}>
      {user.avatarUrl && (
        <img
          className={styles.avatar}
          src={user.avatarUrl}
          alt={`${user.displayName}'s avatar`}
        />
      )}
      <h2 className={styles.name}>{user.displayName}</h2>
      {user.bio && (
        <p className={styles.bio}>{truncateBio(user.bio)}</p>
      )}
    </article>
  );
};
