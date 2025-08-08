import { ReactNode } from 'react';

// Generic card props interface
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

// Generic card component - can display any content
export function Card({ children, className = '', onClick, hover = true }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-xl md:rounded-2xl shadow-lg transition-all duration-300 p-4 md:p-8 h-full border border-gray-100 ${
        hover ? 'hover:shadow-xl hover:border-blue-200' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
