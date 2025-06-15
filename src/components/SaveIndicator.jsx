
import { useState, useEffect } from 'react';

function SaveIndicator() {
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved

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
