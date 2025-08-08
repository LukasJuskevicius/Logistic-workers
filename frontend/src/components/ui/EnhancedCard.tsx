import { ReactNode } from 'react';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
  onClick?: () => void;
  hover?: boolean;
}

// Enhanced card component with visual appeal and decorative elements
export function EnhancedCard({ 
  children, 
  className = '', 
  variant = 'default',
  onClick,
  hover = true 
}: EnhancedCardProps) {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-lg',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-xl',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl',
    elevated: 'bg-white border border-gray-200 shadow-2xl transform hover:scale-105'
  };

  const hoverEffects = hover ? 'hover:shadow-2xl hover:border-blue-300 transition-all duration-300' : '';

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl md:rounded-2xl p-6 md:p-8 
        ${variants[variant]} 
        ${hoverEffects}
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M0 0 L64 0 L64 64 Z" fill="currentColor" />
        </svg>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="subtle-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtle-dots)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
