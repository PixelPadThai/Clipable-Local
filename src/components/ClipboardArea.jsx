
import { useClipboard } from '../hooks/useClipboard.js';
import CopyButton from './CopyButton.jsx';

function ClipboardArea({ roomCode, areaName, placeholder, onFocus, onBlur }) {
  const { content, updateContent, isLoading, isSaving } = useClipboard(roomCode, areaName);

  const handleChange = (e) => {
    updateContent(e.target.value);
  };

  // Calculate stats
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const tokens = Math.ceil(chars / 4);

  if (isLoading) {
    return (
      <div className="text-area-wrapper">
        <div className="textarea-container">
          <div className="glass-textarea" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-area-wrapper">
      <div className="textarea-container">
        <div className="floating-stats">
          <span className="word-count">{words} words</span>
          <span className="char-count">{chars} chars</span>
          <span className="token-count">{tokens} tokens</span>
        </div>
        
        <div className="floating-copy">
          <CopyButton text={content} />
        </div>

        <textarea
          className="glass-textarea"
          value={content}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
        />

        {isSaving && (
          <div className="status-indicator">
            <div className="status-dot saving"></div>
            <span>Saving...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClipboardArea;
