import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // For local clipboard, we don't need authentication
  // Just provide a mock user and simple interface
  const [user] = useState({ id: 'local-user', email: 'local@clipboard.app' });
  const [session] = useState({ user: { id: 'local-user' } });
  const [loading] = useState(false);

  const signInWithEmail = async (email) => {
    // Mock sign in - always success for local operation
    return { error: null };
  };

  const signOut = async () => {
    // Mock sign out - always success for local operation
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signInWithEmail,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
