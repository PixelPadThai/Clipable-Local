
function AnimatedLogo({ position, isActive, areaName }) {
  return (
    <div className={`animated-logo ${position} ${isActive ? 'active' : ''}`}>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8E63" />
            <stop offset="25%" stopColor="#FF7EB0" />
            <stop offset="50%" stopColor="#4B73FF" />
            <stop offset="75%" stopColor="#FF66F4" />
            <stop offset="100%" stopColor="#FE7B02" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="150" r="100" fill="url(#gradient)" opacity="0.8" />
        <circle cx="150" cy="150" r="60" fill="url(#gradient)" opacity="0.6" />
        <circle cx="150" cy="150" r="20" fill="url(#gradient)" opacity="1" />
      </svg>
    </div>
  );
}

export default AnimatedLogo;
