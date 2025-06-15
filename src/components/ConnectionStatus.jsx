
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client.js';

function ConnectionStatus({ roomCode }) {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // Check connection status
    const checkConnection = async () => {
      try {
        // Simple ping to check if Supabase is reachable
        const { error } = await supabase.from('clipboard_rooms').select('id').limit(1);
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
      {roomCode && (
        <div className="room-info">
          <span>Room: {roomCode}</span>
        </div>
      )}
    </div>
  );
}

export default ConnectionStatus;
