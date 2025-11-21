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
      className={`bg-app-card border-2 border-app-border rounded-xl p-4 shadow-card transition-all duration-300 ${glowClass} ${className} ${
        onClick ? 'cursor-pointer hover:border-accent-green hover:shadow-card-hover hover:-translate-y-1' : ''
      }`}
    >
      {children}
    </div>
  );
};
