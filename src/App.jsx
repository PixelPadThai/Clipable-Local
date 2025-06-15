import { useState, useEffect } from 'react';
import './App.css';
import ClipboardArea from './components/ClipboardArea.jsx';
import ConnectionStatus from './components/ConnectionStatus.jsx';
import SaveIndicator from './components/SaveIndicator.jsx';
import AnimatedLogo from './components/AnimatedLogo.jsx';
import RoomCodeInput from './components/RoomCodeInput.jsx';
import { clipboardOperations } from './services/clipboardOperations.js';
import './components/RoomCodeInput.css';

function App() {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [activeArea, setActiveArea] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const createInitialRoom = async () => {
      const newRoomCode = await clipboardOperations.createRoom();
      if (newRoomCode) {
        setRoomCode(newRoomCode);
      } else {
        alert('Failed to create a room. Please refresh the page to try again.');
      }
      setIsLoading(false);
    };
    createInitialRoom();
  }, []);

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

  const handleJoinRoom = async (code) => {
    setIsLoading(true);
    const success = await clipboardOperations.joinRoom(code);
    if (success) {
      setRoomCode(code);
    } else {
      alert('Failed to join room. The room code might be invalid.');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="app" style={{ display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <h2>Creating a new room...</h2>
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
            <ConnectionStatus roomCode={roomCode} onJoinRoom={handleJoinRoom} />
          </div>
          <div className="header">
            <h1>Clipable</h1>
          </div>
          <div className="status-right">
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
            roomCode={roomCode}
            areaName="area_1"
            placeholder="Start typing here... Your text will sync across all devices using the room code."
            onFocus={() => handleAreaFocus('area_1')}
            onBlur={handleAreaBlur}
          />
          <ClipboardArea
            roomCode={roomCode}
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

export default App;
