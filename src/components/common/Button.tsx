import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'font-bold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const variants = {
    primary: 'bg-accent-green text-app-bg hover:bg-accent-green/90 shadow-lg shadow-accent-green/30',
    secondary: 'bg-app-card text-white border-2 border-app-border hover:border-accent-green',
    danger: 'bg-accent-red text-white hover:bg-accent-red/90 shadow-lg shadow-accent-red/30',
    success: 'bg-accent-gold text-app-bg hover:bg-accent-gold/90 shadow-lg shadow-accent-gold/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};
