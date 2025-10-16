import { forwardRef } from 'react';
import type { ReactNode, CSSProperties, MouseEvent } from 'react';
import S from './styles';

interface StackProps {
  children: ReactNode;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  fullWidth?: boolean;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const VStack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      gap = 0,
      align = 'stretch',
      justify = 'start',
      fullWidth = false,
      style,
      onClick,
    },
    ref
  ) => {
    return (
      <S.Container
        direction="column"
        gap={gap}
        align={align}
        justify={justify}
        fullWidth={fullWidth}
        ref={ref}
        style={style}
        onClick={onClick}
      >
        {children}
      </S.Container>
    );
  }
);

VStack.displayName = 'VStack';

export const HStack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      gap = 0,
      align = 'center',
      justify = 'start',
      fullWidth = false,
      style,
      onClick,
    },
    ref
  ) => {
    return (
      <S.Container
        direction="row"
        gap={gap}
        align={align}
        justify={justify}
        fullWidth={fullWidth}
        ref={ref}
        style={style}
        onClick={onClick}
      >
        {children}
      </S.Container>
    );
  }
);

HStack.displayName = 'HStack';
