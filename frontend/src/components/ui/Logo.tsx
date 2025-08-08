interface LogisticWorkersLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LogisticWorkersLogo({ className = '', size = 'medium' }: LogisticWorkersLogoProps) {
  const sizeClasses = {
    small: 'w-44 h-14',
    medium: 'w-56 h-20',
    large: 'w-72 h-28'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Glow ellipse */}
        <ellipse cx="60" cy="70" rx="52" ry="16" fill="url(#glow)" opacity="0.25" />

        {/* Gradient defs */}
        <defs>
          <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 70) rotate(90) scale(16 52)">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Brand mark circle */}
        <circle cx="60" cy="60" r="44" fill="url(#brandGradient)" opacity="0.1" stroke="url(#brandGradient)" strokeWidth="2" />

        {/* Truck silhouette */}
        <g transform="translate(22, 36) scale(0.95)" fill="url(#brandGradient)">
          <path d="M55.81,44.35V36.41a3.09,3.09,0,0,0-3.09-3.09h-.81v-29a.8.8,0,0,0-.34-.65l-2-1.29A.77.77,0,0,0,48.41,3v9.32l-.59-1.58a5.42,5.42,0,0,0-5.07-3.53H29.24a5.43,5.43,0,0,0-5.09,3.56l-.56,1.55V3a.77.77,0,0,0-1.19-.64l-2,1.29a.8.8,0,0,0-.34.65v29h-.81a3.09,3.09,0,0,0-3.09,3.09v7.94H14.87a.77.77,0,0,0-.77.77V49.4a.77.77,0,0,0,.77.77H18.2v2a1.55,1.55,0,0,0,1.55,1.54h4.1a1.54,1.54,0,0,0,1.54-1.54v-2H46.61v2a1.54,1.54,0,0,0,1.54,1.54h4.1a1.55,1.55,0,0,0,1.55-1.54v-2h3.33a.77.77,0,0,0,.77-.77V45.12a.77.77,0,0,0-.77-.77ZM24.62,16.63H47.38v7.62H24.62Zm-.53,25.56H21.45A1.46,1.46,0,0,1,20,40.73v0a1.46,1.46,0,0,1,1.46-1.46h2.64a1.46,1.46,0,0,1,1.46,1.46v0A1.46,1.46,0,0,1,24.09,42.19Zm17.16.43H30.75a1.54,1.54,0,0,1-1.55-1.55V31.28a1.54,1.54,0,0,1,1.55-1.54h10.5a1.54,1.54,0,0,1,1.55,1.54v9.79A1.54,1.54,0,0,1,41.25,42.62Zm9.3-.43H47.91a1.46,1.46,0,0,1-1.46-1.46v0a1.46,1.46,0,0,1,1.46-1.46h2.64A1.46,1.46,0,0,1,52,40.69v0A1.46,1.46,0,0,1,50.55,42.19ZM41,35.39H31a.76.76,0,0,1-.77-.76v0a.76.76,0,0,1,.77-.76H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,35.39Zm0-3.09H31a.76.76,0,0,1-.77-.76v0a.76.76,0,0,1,.77-.76H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,32.3Zm0,9.27H31a.76.76,0,0,1-.77-.76v0A.76.76,0,0,1,31,40H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,41.57Zm0-3.09H31a.76.76,0,0,1-.77-.76v0a.76.76,0,0,1,.77-.76H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,38.48Z" />
        </g>

        {/* Title */}
        <g transform="translate(140, 42)">
          <text className="fill-slate-800" style={{fontSize: '24px', fontWeight: 'bold', fontFamily: 'Inter, system-ui, sans-serif'}}>LOGISTIC</text>
          <text y="22" className="fill-slate-600" style={{fontSize: '24px', fontWeight: 'bold', fontFamily: 'Inter, system-ui, sans-serif'}}>WORKERS</text>
          <text y="42" className="fill-slate-500" style={{fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif'}}>Driver Recruitment Specialists</text>
        </g>

        {/* Accent line */}
        <path d="M120 45 Q130 45 135 50 Q140 55 140 65" stroke="url(#brandGradient)" strokeWidth="2" fill="none" opacity="0.8"/>
      </svg>
    </div>
  );
} 