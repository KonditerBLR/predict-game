import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  glow = false,
}) => {
  const glowClass = glow ? 'animate-pulse-glow' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-app-card border-2 border-app-border rounded-xl p-4 ${glowClass} ${className} ${
        onClick ? 'cursor-pointer hover:border-accent-green transition-all' : ''
      }`}
    >
      {children}
    </div>
  );
};
