import { useState, useEffect } from 'react';
import { clipboardService } from '../services/clipboardService.js';

function ConnectionStatus() {
  const [connectedSessions, setConnectedSessions] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check connection status
    const checkStatus = () => {
      setIsConnected(clipboardService.isConnected);
    };

    // Fetch server status periodically
    const fetchStatus = async () => {
      try {
        const status = await clipboardService.checkServerStatus();
        if (status) {
          setConnectedSessions(status.clients);
        }
      } catch (error) {
        console.error('Failed to fetch server status:', error);
      }
    };

    // Initial check
    checkStatus();
    fetchStatus();

    // Set up intervals
    const statusInterval = setInterval(checkStatus, 1000);
    const serverStatusInterval = setInterval(fetchStatus, 3000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(serverStatusInterval);
    };
  }, []);

  return (
    <div className="connection-status">
      <div className="connection-indicator">
        <div className={`connection-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
        <span>{connectedSessions} active</span>
      </div>
    </div>
  );
}

export default ConnectionStatus; 