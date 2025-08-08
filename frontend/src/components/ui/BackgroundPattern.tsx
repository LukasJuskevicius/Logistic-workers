import { ReactNode } from 'react';

interface BackgroundPatternProps {
  children: ReactNode;
  className?: string;
  pattern?: 'waves' | 'dots' | 'grid' | 'circles';
  opacity?: number;
}

// Reusable background pattern component with SVG decorations
export function BackgroundPattern({ 
  children, 
  className = '', 
  pattern = 'waves',
  opacity = 0.1 
}: BackgroundPatternProps) {
  const patterns = {
    waves: (
      <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
        <defs>
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q25 0 50 10 T100 10" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M0 15 Q25 5 50 15 T100 15" stroke="currentColor" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
    ),
    dots: (
      <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    grid: (
      <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    circles: (
      <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
        <defs>
          <pattern id="circles" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="currentColor" />
            <circle cx="15" cy="15" r="1" fill="currentColor" />
            <circle cx="45" cy="45" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    )
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {patterns[pattern]}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
