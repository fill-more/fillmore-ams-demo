import type { CSSProperties, ReactNode, ElementType } from 'react';
import S, { type TextWeight } from './styles';

export interface TextProps {
  as?: ElementType;
  size?: number;
  weight?: TextWeight;
  color?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const Text: React.FC<TextProps> = ({
  as = 'span',
  size = 14,
  weight = 'regular',
  color = 'var(--black)',
  style,
  children,
}) => {
  return (
    <S.TextBase
      as={as}
      $size={size}
      $weight={weight}
      $color={color}
      style={style}
    >
      {children}
    </S.TextBase>
  );
};

export default Text;
