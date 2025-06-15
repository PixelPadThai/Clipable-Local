
import { useState } from 'react';
import './App.css';
import ClipboardArea from './components/ClipboardArea.jsx';
import ConnectionStatus from './components/ConnectionStatus.jsx';
import SaveIndicator from './components/SaveIndicator.jsx';
import AnimatedLogo from './components/AnimatedLogo.jsx';
import Auth from './components/Auth.jsx';
import UserProfile from './components/UserProfile.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';

function AppContent() {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [activeArea, setActiveArea] = useState(null);
  const { user, loading } = useAuth();

  const toggleEffects = () => {
    setEffectsEnabled(!effectsEnabled);
  };

  const handleOpacityChange = (e) => {
    setOverlayOpacity(parseInt(e.target.value));
  };

  const handleAreaFocus = (areaName) => {
    setActiveArea(areaName);
  };

  const handleAreaBlur = () => {
    setActiveArea(null);
  };

  if (loading) {
    return (
      <div className="app loading-screen">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <Auth />
      </div>
    );
  }

  return (
    <div className={`app ${effectsEnabled ? 'effects-enabled' : 'effects-disabled'}`}>
      {overlayOpacity > 0 && (
        <div 
          className="black-overlay" 
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}
      {effectsEnabled && (
        <>
          <AnimatedLogo 
            position="left" 
            isActive={activeArea === 'area_1'} 
            areaName="area_1" 
          />
          <AnimatedLogo 
            position="right" 
            isActive={activeArea === 'area_2'} 
            areaName="area_2" 
          />
        </>
      )}
      <div className="clipboard-container">
        <div className="status-bar">
          <div className="status-left">
            <ConnectionStatus />
          </div>
          <div className="header">
            <h1>Clipable</h1>
          </div>
          <div className="status-right">
            <UserProfile />
            <div className="background-toggle-container">
              <label className="background-toggle" title={effectsEnabled ? 'Switch to static background' : 'Switch to animated background'}>
                <input 
                  type="checkbox" 
                  checked={effectsEnabled} 
                  onChange={toggleEffects}
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
                onChange={handleOpacityChange}
                className="opacity-slider"
                title={`Black overlay: ${overlayOpacity}%`}
              />
            </div>
            <SaveIndicator />
          </div>
        </div>
        
        <div className="text-areas">
          <ClipboardArea
            areaName="area_1"
            placeholder="Start typing here... Your text will sync across all devices in real-time."
            onFocus={() => handleAreaFocus('area_1')}
            onBlur={handleAreaBlur}
          />
          <ClipboardArea
            areaName="area_2"
            placeholder="Use this area for different content... Perfect for comparing or organizing text."
            onFocus={() => handleAreaFocus('area_2')}
            onBlur={handleAreaBlur}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
