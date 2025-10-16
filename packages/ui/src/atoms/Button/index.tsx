import React, { type CSSProperties } from 'react';
import S from './styles';

interface ButtonProps {
  variant?: 'light' | 'dark';
  filled?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'light',
  filled = false,
  size = 'medium',
  children,
  onClick,
  disabled = false,
  type = 'button',
  style,
}) => {
  return (
    <S.ButtonContainer
      variant={variant}
      filled={filled}
      size={size}
      onClick={onClick}
      type={type}
      style={style}
      disabled={disabled}
    >
      {children}
    </S.ButtonContainer>
  );
};

export default Button;
