import React from 'react';
import { btnStyles, btnContentWrapper } from './button.styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large'; 
  variant?: 'primary' | 'secondary' | 'danger' | 'default'; 
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '', 
  size = 'medium', 
  variant = 'primary' 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type !== 'submit' && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      className={`${btnStyles(variant, size, disabled)} ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      <span className={btnContentWrapper}>{children}</span>
    </button>
  );
};


export default Button;
