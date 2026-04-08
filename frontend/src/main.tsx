import { createRoot } from 'react-dom/client';
import { ProfileCard } from './components/ProfileCard';

const sampleUser = {
  id: 'u1',
  displayName: 'Ada Lovelace',
  avatarUrl: 'https://i.pravatar.cc/150?u=ada',
  bio: 'Pioneer of computing. Wrote the first algorithm intended for a machine. Passionate about mathematics, poetry, and the intersection of art and science.',
};

const noAvatarUser = {
  id: 'u2',
  displayName: 'Grace Hopper',
  bio: 'Computer scientist and Navy rear admiral. Invented the first compiler.',
};

const minimalUser = {
  id: 'u3',
  displayName: 'Alan Turing',
};

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>ProfileCard Preview</h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <div>
          <h2>Size: sm</h2>
          <ProfileCard user={sampleUser} size="sm" />
        </div>
        <div>
          <h2>Size: md (default)</h2>
          <ProfileCard user={sampleUser} size="md" />
        </div>
        <div>
          <h2>Size: lg</h2>
          <ProfileCard user={sampleUser} size="lg" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <h2>No Avatar</h2>
          <ProfileCard user={noAvatarUser} />
        </div>
        <div>
          <h2>No Bio</h2>
          <ProfileCard user={minimalUser} />
        </div>
        <div>
          <h2>Loading</h2>
          <ProfileCard isLoading />
        </div>
        <div>
          <h2>Empty</h2>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
