
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
    <div className="user-profile">
      <span className="user-email">{user.email}</span>
      <button 
        onClick={handleSignOut}
        className="sign-out-button"
        title="Sign out"
      >
        Sign Out
      </button>
    </div>
  );
}

export default UserProfile;
