import { useState, useEffect } from 'react';
import { SERVER_CONFIG } from '../config.js';

function ConnectionStatus({ roomCode, onJoinRoom, connected, connectionCount }) {
  const [inputCode, setInputCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      onJoinRoom(inputCode.trim());
      setIsEditing(false);
      setInputCode('');
    }
  };

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
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
        <span className="connection-text">
          {connected ? 'Connected' : 'Disconnected'}
        </span>
        {connected && (
          <span className="connection-count">
            {connectionCount}
          </span>
        )}
      </div>
      
      {/* Mobile compact version */}
      <div className="connection-indicator-mobile">
        <div className={`connection-dot ${connected ? 'connected' : 'disconnected'}`}></div>
      </div>
    </div>
  );
}

export default ConnectionStatus;
