
import { useState, useEffect } from 'react';

function SaveIndicator() {
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved

  // Listen for save events (you can implement this based on your save logic)
  useEffect(() => {
    // For now, just show idle state
    // In a real implementation, you'd listen for save events
    const timer = setTimeout(() => {
      if (saveStatus === 'saved') {
        setSaveStatus('idle');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [saveStatus]);

  return (
    <div className="save-indicator">
      <div className={`save-icon ${saveStatus}`}>
        {saveStatus === 'saving' && '⏳'}
        {saveStatus === 'saved' && '✓'}
        {saveStatus === 'idle' && '💾'}
      </div>
    </div>
  );
}

export default SaveIndicator;
