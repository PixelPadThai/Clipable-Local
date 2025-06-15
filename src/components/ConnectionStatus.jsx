
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client.js';

function ConnectionStatus() {
  const [connected, setConnected] = useState(true);
  const [sessionsCount, setSessionsCount] = useState(1);

  useEffect(() => {
    // Check connection status
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        setConnected(!error);
      } catch (error) {
        setConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="connection-status">
      <div className="connection-indicator">
        <div className={`connection-dot ${connected ? 'connected' : 'disconnected'}`}></div>
        <span>{connected ? 'Connected' : 'Disconnected'}</span>
      </div>
      <div className="sessions-count">
        <span>👥 {sessionsCount}</span>
      </div>
    </div>
  );
}

export default ConnectionStatus;
