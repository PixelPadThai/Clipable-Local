
import { useAuth } from '../contexts/AuthContext.jsx';

function UserProfile() {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return <div className="user-profile loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '14px'
    }}>
      <span className="user-email" style={{
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {user.email}
      </span>
      <button 
        onClick={handleSignOut}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '6px 12px',
          color: 'rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        title="Sign out"
      >
        Sign Out
      </button>
    </div>
  );
}

export default UserProfile;
