import { useState } from 'react';
import LovableLogo from './LovableLogo.jsx';

function MobileHeader({ 
  connectionStatus, 
  connectionCount, 
  connected,
  effectsEnabled, 
  setEffectsEnabled, 
  overlayOpacity, 
  setOverlayOpacity,
  saveIndicator 
}) {
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const toggleSettings = () => {
    setSettingsExpanded(!settingsExpanded);
  };

  return (
    <div className="mobile-header">
      <div className="mobile-header-main">
        {/* Left: Logo */}
        <div className="mobile-logo-left">
          <h1>
            Clipable
            <span className="local-text">Local</span>
          </h1>
        </div>

        {/* Right: User count with connection status and settings */}
        <div className="mobile-status-right">
          <div className="mobile-user-count">
            <div className={`connection-dot ${connected ? 'connected' : 'disconnected'}`}></div>
            <span className="user-icon">👥</span>
            <span className="user-number">{connectionCount}</span>
          </div>
          <button 
            className={`mobile-settings-toggle ${settingsExpanded ? 'active' : ''}`}
            onClick={toggleSettings}
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Expandable settings section */}
      {settingsExpanded && (
        <div className="mobile-settings-expanded">
          <div className="mobile-settings-row">
            <div className="background-toggle-container">
              <label className="background-toggle">
                <input
                  type="checkbox"
                  checked={effectsEnabled}
                  onChange={(e) => setEffectsEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="opacity-slider-container">
              <input
                type="range"
                min="0"
                max="90"
                step="10"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                className="opacity-slider"
              />
            </div>

            {saveIndicator}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileHeader; 