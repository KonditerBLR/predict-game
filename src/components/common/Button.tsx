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
  const baseStyles = 'font-bold rounded-lg transition-all duration-300 active:scale-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:translate-y-0';

  const variants = {
    primary: 'bg-gradient-green text-app-bg shadow-button hover:shadow-button-hover',
    secondary: 'bg-app-card text-white border-2 border-app-border hover:border-accent-green shadow-card hover:shadow-card-hover',
    danger: 'bg-gradient-red text-white shadow-red-button hover:shadow-red-button-hover',
    success: 'bg-gradient-gold text-app-bg shadow-gold-button hover:shadow-gold-button-hover',
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
