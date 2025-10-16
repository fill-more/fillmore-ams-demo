import React from 'react';
import type { CSSProperties } from 'react';
import S from './styles';

export interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  length?: number | string;
  thickness?: number;
  color?: string;
  style?: CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  length = '100%',
  thickness = 1,
  color = 'var(--light-gray)',
  style,
  ...props
}) => {
  return (
    <S.Divider
      direction={direction}
      length={length}
      thickness={thickness}
      color={color}
      style={style}
      {...props}
    />
  );
};

export default Divider;
