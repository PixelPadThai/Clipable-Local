
import { useState } from 'react';

function RoomCodeInput({ onJoinRoom, currentRoomCode }) {
  const [inputCode, setInputCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (inputCode.length === 6 && /^\d{6}$/.test(inputCode)) {
      onJoinRoom(inputCode);
      setIsEditing(false);
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

  if (isEditing) {
    return (
      <div className="room-code-display">
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
            onClick={() => setIsEditing(false)}
            className="cancel-btn-inline"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="room-code-display">
      <div 
        className="current-room" 
        onClick={() => setIsEditing(true)} 
        title="Click to join another room"
      >
        <span className="room-label">Room Code:</span>
        <span className="room-code">{currentRoomCode}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(currentRoomCode);
          }}
          className="copy-room-code"
          title="Copy room code"
        >
          📋
        </button>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="leave-room-btn"
        title="Create a new room"
      >
        New Room
      </button>
    </div>
  );
}

export default RoomCodeInput;
