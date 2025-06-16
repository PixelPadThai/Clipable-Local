function MobileClipboardTabs({ activeArea, onAreaChange }) {
  return (
    <div className="mobile-clipboard-tabs">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeArea === 'area_1' ? 'active' : ''}`}
          onClick={() => onAreaChange('area_1')}
        >
          <span className="tab-icon">📝</span>
          <span className="tab-label">Area 1</span>
        </button>
        <button
          className={`tab-button ${activeArea === 'area_2' ? 'active' : ''}`}
          onClick={() => onAreaChange('area_2')}
        >
          <span className="tab-icon">📋</span>
          <span className="tab-label">Area 2</span>
        </button>
      </div>
    </div>
  );
}

export default MobileClipboardTabs; 