
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client.js';

function ConnectionStatus({ roomCode, onJoinRoom }) {
  const [connected, setConnected] = useState(true);
  const [inputCode, setInputCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (inputCode.length === 6 && /^\d{6}$/.test(inputCode)) {
      onJoinRoom(inputCode);
      setIsEditing(false);
      setInputCode('');
    }
  };

  const formatRoomCode = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    return digits;
  };

  const handleInputChange = (e) => {
    const formatted = formatRoomCode(e.target.value);
    setInputCode(formatted);
  };

  const handleCopyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
    }
  };

  const handleNewRoom = () => {
    window.location.reload();
  };

  return (
    <div className="connection-status">
      <div className="connection-indicator">
        <div className={`connection-dot ${connected ? 'connected' : 'disconnected'}`}></div>
        <span>{connected ? 'Connected' : 'Disconnected'}</span>
      </div>
      {roomCode && (
        <div className="room-info">
          {isEditing ? (
            <form onSubmit={handleJoinSubmit} className="join-room-form-inline">
              <input
                type="text"
                value={inputCode}
                onChange={handleInputChange}
                placeholder="000000"
                className="room-code-field-inline"
                maxLength="6"
                autoFocus
              />
              <button 
                type="submit" 
                disabled={inputCode.length !== 6}
                className="join-btn-inline"
              >
                Join
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setInputCode('');
                }}
                className="cancel-btn-inline"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="room-display">
              <div 
                className="current-room" 
                onClick={() => setIsEditing(true)} 
                title="Click to join another room"
              >
                <span className="room-label">Room:</span>
                <span className="room-code">{roomCode}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyRoomCode();
                  }}
                  className="copy-room-code"
                  title="Copy room code"
                >
                  📋
                </button>
              </div>
              <button 
                onClick={handleNewRoom}
                className="new-room-btn"
                title="Create a new room"
              >
                New
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConnectionStatus;
