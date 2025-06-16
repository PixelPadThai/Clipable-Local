import { useState } from 'react';

function ClearButton({ onClear, disabled }) {
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    if (disabled) return;
    
    setIsClearing(true);
    await onClear();
    setTimeout(() => setIsClearing(false), 1000);
  };

  return (
    <button
      onClick={handleClear}
      className={`clear-button ${isClearing ? 'clearing' : ''} ${disabled ? 'disabled' : ''}`}
      title={disabled ? 'No content to clear' : 'Clear clipboard content'}
      disabled={disabled}
    >
      {isClearing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="M19,6l-2,14a2,2,0,0,1-2,2H9a2,2,0,0,1-2-2L5,6"></path>
          <path d="M10,11v6"></path>
          <path d="M14,11v6"></path>
          <path d="M9,6V4a2,2,0,0,1,2-2h2a2,2,0,0,1,2,2V6"></path>
        </svg>
      )}
    </button>
  );
}

export default ClearButton; 