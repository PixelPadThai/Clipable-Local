
function AnimatedLogo({ position, isActive, areaName }) {
  return (
    <div className={`animated-logo ${position} ${isActive ? 'active' : ''}`}>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8E63" />
            <stop offset="25%" stopColor="#FF7EB0" />
            <stop offset="50%" stopColor="#4B73FF" />
            <stop offset="75%" stopColor="#FF66F4" />
            <stop offset="100%" stopColor="#FE7B02" />
          </linearGradient>
        </defs>
        
        {/* Clipboard icon */}
        <rect
          x="75"
          y="50"
          width="150"
          height="200"
          rx="15"
          ry="15"
          fill="url(#logoGradient)"
          opacity="0.8"
        />
        
        {/* Clipboard clip */}
        <rect
          x="120"
          y="30"
          width="60"
          height="30"
          rx="8"
          ry="8"
          fill="url(#logoGradient)"
          opacity="0.9"
        />
        
        {/* Text lines */}
        <rect x="100" y="100" width="100" height="8" rx="4" fill="rgba(255,255,255,0.6)" />
        <rect x="100" y="125" width="80" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
        <rect x="100" y="150" width="90" height="8" rx="4" fill="rgba(255,255,255,0.4)" />
        <rect x="100" y="175" width="70" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  );
}

export default AnimatedLogo;
