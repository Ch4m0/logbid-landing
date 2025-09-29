import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const defaultClasses = 'bg-blue-100 text-blue-800';
  
  const hasCustomColors = className.includes('bg-') || className.includes('text-');
  const colorClasses = hasCustomColors ? '' : defaultClasses;
  
  const classes = `${baseClasses} ${colorClasses} ${className}`.trim();
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}; 