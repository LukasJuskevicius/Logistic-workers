interface LogisticWorkersLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LogisticWorkersLogo({ className = '', size = 'medium' }: LogisticWorkersLogoProps) {
    const sizeClasses = {
        small: 'w-64 h-24',    // was w-48, now w-64 (33% wider)
        medium: 'w-80 h-32',   // was w-64, now w-80 (25% wider) 
        large: 'w-96 h-40'     // was w-80, now w-96 (20% wider)
      };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle */}
        <circle cx="60" cy="60" r="50" fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2"/>
        
        {/* Lorry positioned inside the circle */}
        <g transform="translate(25, 35) scale(1)">
          <path d="M55.81,44.35V36.41a3.09,3.09,0,0,0-3.09-3.09h-.81v-29a.8.8,0,0,0-.34-.65l-2-1.29A.77.77,0,0,0,48.41,3v9.32l-.59-1.58a5.42,5.42,0,0,0-5.07-3.53H29.24a5.43,5.43,0,0,0-5.09,3.56l-.56,1.55V3a.77.77,0,0,0-1.19-.64l-2,1.29a.8.8,0,0,0-.34.65v29h-.81a3.09,3.09,0,0,0-3.09,3.09v7.94H14.87a.77.77,0,0,0-.77.77V49.4a.77.77,0,0,0,.77.77H18.2v2a1.55,1.55,0,0,0,1.55,1.54h4.1a1.54,1.54,0,0,0,1.54-1.54v-2H46.61v2a1.54,1.54,0,0,0,1.54,1.54h4.1a1.55,1.55,0,0,0,1.55-1.54v-2h3.33a.77.77,0,0,0,.77-.77V45.12a.77.77,0,0,0-.77-.77ZM24.62,16.63H47.38v7.62H24.62Zm-.53,25.56H21.45A1.46,1.46,0,0,1,20,40.73v0a1.46,1.46,0,0,1,1.46-1.46h2.64a1.46,1.46,0,0,1,1.46,1.46v0A1.46,1.46,0,0,1,24.09,42.19Zm17.16.43H30.75a1.54,1.54,0,0,1-1.55-1.55V31.28a1.54,1.54,0,0,1,1.55-1.54h10.5a1.54,1.54,0,0,1,1.55,1.54v9.79A1.54,1.54,0,0,1,41.25,42.62Zm9.3-.43H47.91a1.46,1.46,0,0,1-1.46-1.46v0a1.46,1.46,0,0,1,1.46-1.46h2.64A1.46,1.46,0,0,1,52,40.69v0A1.46,1.46,0,0,1,50.55,42.19ZM41,35.39H31a.76.76,0,0,1-.77-.76v0a.76.76,0,0,1,.77-.76H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,35.39Zm0-3.09H31a.76.76,0,0,1-.77-.76v0a.76.76,0,0,1,.77-.76H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,32.3Zm0,9.27H31a.76.76,0,0,1-.77-.76v0A.76.76,0,0,1,31,40H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,41.57Zm0-3.09H31a.76.76,0,0,1-.77-.76v0a.76.76,0,0,1,.77-.76H41a.76.76,0,0,1,.76.76v0A.76.76,0,0,1,41,38.48Z" fill="#2563eb"/>
        </g>
        
        {/* People icons representing workers */}
        <g transform="translate(85, 35)">
          {/* Person 1 */}
          <circle cx="8" cy="8" r="4" fill="#059669"/>
          <path d="M2 20 Q2 14 8 14 Q14 14 14 20 L14 25 L2 25 Z" fill="#059669"/>
          
          {/* Person 2 */}
          <circle cx="20" cy="8" r="4" fill="#0891b2"/>
          <path d="M14 20 Q14 14 20 14 Q26 14 26 20 L26 25 L14 25 Z" fill="#0891b2"/>
          
          {/* Person 3 */}
          <circle cx="32" cy="8" r="4" fill="#7c3aed"/>
          <path d="M26 20 Q26 14 32 14 Q38 14 38 20 L38 25 L26 25 Z" fill="#7c3aed"/>
        </g>
        
        {/* Company name */}
        <text x="140" y="45" className="fill-slate-800" style={{fontSize: '24px', fontWeight: 'bold', fontFamily: 'system-ui, sans-serif'}}>
          LOGISTIC
        </text>
        <text x="140" y="65" className="fill-slate-600" style={{fontSize: '24px', fontWeight: 'bold', fontFamily: 'system-ui, sans-serif'}}>
          WORKERS
        </text>
        
        {/* Tagline */}
        <text x="140" y="85" className="fill-slate-500" style={{fontSize: '12px', fontFamily: 'system-ui, sans-serif'}}>
          Driver Recruitment Specialists
        </text>
        
        {/* Connecting line element */}
        <path d="M120 45 Q130 45 135 50 Q140 55 140 65" stroke="#2563eb" strokeWidth="2" fill="none" opacity="0.6"/>
      </svg>
    </div>
  );
} 