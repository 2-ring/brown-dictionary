import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}: ButtonProps) => {
  const baseStyles = 'px-6 py-2.5 rounded-full font-medium transition-colors';

  const variants = {
    primary: 'bg-ud-blue hover:bg-ud-blue-bright text-white',
    secondary: 'bg-ud-navy-light hover:bg-ud-navy text-ud-text',
    outline: 'border-2 border-ud-border hover:border-ud-blue text-ud-text',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
