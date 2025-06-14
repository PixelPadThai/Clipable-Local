import React from 'react';

function AnimatedLogo({ className = '', position = 'center', isActive = false, areaName = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" 
      viewBox="0 0 23 24" 
      className={`animated-logo ${className} ${position} ${isActive ? 'active' : 'inactive'}`}
      data-area={areaName}
    >
      <defs>
        <mask id={`lovable-logo_mask_${areaName}`} width="23" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{maskType: 'alpha'}}>
          <path 
            fill={`url(#lovable-logo_gradient_${areaName})`} 
            fillRule="evenodd" 
            d="M6.898 0c3.81 0 6.898 3.179 6.898 7.1v2.7h2.295c3.81 0 6.898 3.178 6.898 7.1S19.901 24 16.091 24H0V7.1C0 3.18 3.088 0 6.898 0" 
            clipRule="evenodd"
          />
        </mask>
        
        <filter id={`blur1_${areaName}`} width="45.444" height="46.274" x="-12.638" y="-10.326" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58" />
        </filter>
        
        <filter id={`blur2_${areaName}`} width="54.181" height="46.274" x="-15.297" y="-19.094" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58" />
        </filter>
        
        <filter id={`blur3_${areaName}`} width="45.444" height="42.383" x="-7.677" y="-20.154" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58" />
        </filter>
        
        <filter id={`blur4_${areaName}`} width="33.038" height="33.538" x="-4.448" y="-12.73" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="3.58" />
        </filter>
        
        <linearGradient id={`lovable-logo_gradient_${areaName}`} x1="7.736" x2="15.072" y1="4.218" y2="23.867" gradientUnits="userSpaceOnUse">
          <stop offset="0.025" stopColor="#FF8E63">
            <animate attributeName="stop-color" 
              values="#FF8E63;#4B73FF;#FF66F4;#FE7B02;#FF8E63" 
              dur={isActive ? "4s" : "8s"} 
              repeatCount="indefinite" />
          </stop>
          <stop offset="0.56" stopColor="#FF7EB0">
            <animate attributeName="stop-color" 
              values="#FF7EB0;#FF8E63;#4B73FF;#FF66F4;#FF7EB0" 
              dur={isActive ? "5s" : "10s"} 
              repeatCount="indefinite" />
          </stop>
          <stop offset="0.95" stopColor="#4B73FF">
            <animate attributeName="stop-color" 
              values="#4B73FF;#FF66F4;#FE7B02;#FF8E63;#4B73FF" 
              dur={isActive ? "6s" : "12s"} 
              repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      
      <g mask={`url(#lovable-logo_mask_${areaName})`}>
        <g filter={`url(#blur1_${areaName})`}>
          <ellipse cx="10.084" cy="12.811" fill="#4B73FF" rx="15.562" ry="15.977">
            <animate attributeName="fill" 
              values="#4B73FF;#FF66F4;#FF0105;#FE7B02;#4B73FF" 
              dur={isActive ? "3s" : "6s"} 
              repeatCount="indefinite" />
            <animateTransform attributeName="transform" 
              type="translate" 
              values={isActive ? "0,0;4,-2;-2,4;-4,-2;0,0" : "0,0;2,-1;-1,2;-2,-1;0,0"} 
              dur={isActive ? "8s" : "15s"} 
              repeatCount="indefinite" />
          </ellipse>
        </g>
        
        <g filter={`url(#blur2_${areaName})`}>
          <ellipse cx="11.794" cy="4.043" fill="#FF66F4" rx="19.931" ry="15.977">
            <animate attributeName="fill" 
              values="#FF66F4;#FF0105;#FE7B02;#4B73FF;#FF66F4" 
              dur={isActive ? "3.5s" : "7s"} 
              repeatCount="indefinite" />
            <animateTransform attributeName="transform" 
              type="translate" 
              values={isActive ? "0,0;-2,2;2,-4;4,2;0,0" : "0,0;-1,1;1,-2;2,1;0,0"} 
              dur={isActive ? "9s" : "18s"} 
              repeatCount="indefinite" />
          </ellipse>
        </g>
        
        <g filter={`url(#blur3_${areaName})`}>
          <ellipse cx="15.045" cy="1.037" fill="#FF0105" rx="15.562" ry="14.031">
            <animate attributeName="fill" 
              values="#FF0105;#FE7B02;#4B73FF;#FF66F4;#FF0105" 
              dur={isActive ? "4.5s" : "9s"} 
              repeatCount="indefinite" />
            <animateTransform attributeName="transform" 
              type="translate" 
              values={isActive ? "0,0;2,4;-4,0;2,-2;0,0" : "0,0;1,2;-2,0;1,-1;0,0"} 
              dur={isActive ? "10s" : "20s"} 
              repeatCount="indefinite" />
          </ellipse>
        </g>
        
        <g filter={`url(#blur4_${areaName})`}>
          <ellipse cx="12.071" cy="4.039" fill="#FE7B02" rx="9.359" ry="9.608">
            <animate attributeName="fill" 
              values="#FE7B02;#4B73FF;#FF66F4;#FF0105;#FE7B02" 
              dur={isActive ? "2.5s" : "5s"} 
              repeatCount="indefinite" />
            <animateTransform attributeName="transform" 
              type="translate" 
              values={isActive ? "0,0;-2,-2;4,2;-2,4;0,0" : "0,0;-1,-1;2,1;-1,2;0,0"} 
              dur={isActive ? "6s" : "12s"} 
              repeatCount="indefinite" />
          </ellipse>
        </g>
      </g>
    </svg>
  );
}

export default AnimatedLogo; 