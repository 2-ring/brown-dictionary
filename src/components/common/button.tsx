import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const baseStyles = 'px-6 py-2.5 rounded-full font-medium transition-colors';

  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white',
    secondary: 'bg-card-secondary hover:bg-background text-text',
    outline: 'border-2 border-border hover:border-primary text-text',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};
