import { useState, useEffect } from 'react';

function SaveIndicator() {
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Listen for save events from the clipboard service
    const handleBeforeSave = () => {
      setSaveStatus('saving');
    };

    const handleAfterSave = () => {
      setSaveStatus('saved');
      setLastSaved(new Date());
      
      // Reset to idle after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    };

    // Add event listeners (we'll need to modify the clipboard service to emit these)
    window.addEventListener('clipboard-save-start', handleBeforeSave);
    window.addEventListener('clipboard-save-end', handleAfterSave);

    return () => {
      window.removeEventListener('clipboard-save-start', handleBeforeSave);
      window.removeEventListener('clipboard-save-end', handleAfterSave);
    };
  }, []);

  const getStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <svg className="save-icon saving" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        );
      case 'saved':
        return (
          <svg className="save-icon saved" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        );
      default:
        return (
          <svg className="save-icon idle" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C13.1,12 14,12.9 14,14C14,15.1 13.1,16 12,16C10.9,16 10,15.1 10,14C10,12.9 10.9,12 12,12M6,6H15V10H6V6Z"/>
          </svg>
        );
    }
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      default:
        return lastSaved ? `Saved ${formatTimeAgo(lastSaved)}` : 'Ready';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="save-indicator">
      {getStatusIcon()}
      <span className="save-text">{getStatusText()}</span>
    </div>
  );
}

export default SaveIndicator; 