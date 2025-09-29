import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  // Si className incluye padding específico, no aplicar el padding por defecto
  const hasCustomPadding = className.includes('p-') || className.includes('px-') || className.includes('py-');
  const defaultPadding = hasCustomPadding ? '' : 'p-6';
  
  return (
    <div className={`${defaultPadding} ${className}`.trim()}>
      {children}
    </div>
  );
}; 