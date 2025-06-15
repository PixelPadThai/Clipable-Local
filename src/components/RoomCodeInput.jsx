
import { useState } from 'react';

function RoomCodeInput({ onJoinRoom, onCreateRoom, currentRoomCode }) {
  const [inputCode, setInputCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (inputCode.length === 6 && /^\d{6}$/.test(inputCode)) {
      onJoinRoom(inputCode);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    await onCreateRoom();
    setIsCreating(false);
  };

  const formatRoomCode = (value) => {
    // Only allow digits and limit to 6 characters
    const digits = value.replace(/\D/g, '').slice(0, 6);
    return digits;
  };

  const handleInputChange = (e) => {
    const formatted = formatRoomCode(e.target.value);
    setInputCode(formatted);
  };

  if (currentRoomCode) {
    return (
      <div className="room-code-display">
        <div className="current-room">
          <span className="room-label">Room Code:</span>
          <span className="room-code">{currentRoomCode}</span>
          <button 
            onClick={() => navigator.clipboard.writeText(currentRoomCode)}
            className="copy-room-code"
            title="Copy room code"
          >
            📋
          </button>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="leave-room-btn"
        >
          Leave Room
        </button>
      </div>
    );
  }

  return (
    <div className="room-code-input">
      <div className="welcome-message">
        <h1>Clipable</h1>
        <p>Share text instantly with room codes</p>
      </div>
      
      <form onSubmit={handleJoinRoom} className="join-room-form">
        <div className="input-group">
          <input
            type="text"
            value={inputCode}
            onChange={handleInputChange}
            placeholder="000000"
            className="room-code-field"
            maxLength="6"
          />
          <button 
            type="submit" 
            disabled={inputCode.length !== 6}
            className="join-btn"
          >
            Join Room
          </button>
        </div>
      </form>

      <div className="divider">
        <span>or</span>
      </div>

      <button 
        onClick={handleCreateRoom}
        disabled={isCreating}
        className="create-room-btn"
      >
        {isCreating ? 'Creating...' : 'Create New Room'}
      </button>
    </div>
  );
}

export default RoomCodeInput;
