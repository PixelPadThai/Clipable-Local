
function AnimatedLogo({ position, isActive, areaName }) {
  return (
    <div className={`animated-logo ${position} ${isActive ? 'active' : ''}`}>
      <svg
        width="300"
        height="300"
        viewBox="0 0 23 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <defs>
          <linearGradient id="lovable-logo-gradient" x1="7.736" x2="15.072" y1="4.218" y2="23.867" gradientUnits="userSpaceOnUse">
            <stop offset="0.025" stopColor="#FF8E63"></stop>
            <stop offset="0.56" stopColor="#FF7EB0"></stop>
            <stop offset="0.95" stopColor="#4B73FF"></stop>
          </linearGradient>
          
          <mask id="lovable-logo-mask" width="23" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{maskType: 'alpha'}}>
            <path 
              fill="url(#lovable-logo-gradient)" 
              fillRule="evenodd" 
              d="M6.898 0c3.81 0 6.898 3.179 6.898 7.1v2.7h2.295c3.81 0 6.898 3.178 6.898 7.1S19.901 24 16.091 24H0V7.1C0 3.18 3.088 0 6.898 0" 
              clipRule="evenodd"
            />
          </mask>
          
          <filter id="blue-blur" width="45.444" height="46.274" x="-12.638" y="-10.326" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58"></feGaussianBlur>
          </filter>
          
          <filter id="pink-blur" width="54.181" height="46.274" x="-15.297" y="-19.094" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58"></feGaussianBlur>
          </filter>
          
          <filter id="red-blur" width="45.444" height="42.383" x="-7.677" y="-20.154" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58"></feGaussianBlur>
          </filter>
          
          <filter id="orange-blur" width="33.038" height="33.538" x="-4.448" y="-12.73" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58"></feGaussianBlur>
          </filter>
        </defs>
        
        <g mask="url(#lovable-logo-mask)">
          <g filter="url(#blue-blur)">
            <ellipse cx="10.084" cy="12.811" fill="#4B73FF" rx="15.562" ry="15.977"></ellipse>
          </g>
          <g filter="url(#pink-blur)">
            <ellipse cx="11.794" cy="4.043" fill="#FF66F4" rx="19.931" ry="15.977"></ellipse>
          </g>
          <g filter="url(#red-blur)">
            <ellipse cx="15.045" cy="1.037" fill="#FF0105" rx="15.562" ry="14.031"></ellipse>
          </g>
          <g filter="url(#orange-blur)">
            <ellipse cx="12.071" cy="4.039" fill="#FE7B02" rx="9.359" ry="9.608"></ellipse>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default AnimatedLogo;
