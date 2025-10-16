import S from './styles';
import type { CSSProperties } from 'react';

interface BackgroundProps {
  src: string;
  opacity?: number;
  zIndex?: number;
  style?: CSSProperties;
}

function Background({ src, opacity, zIndex, style }: BackgroundProps) {
  return (
    <S.BackgroundImage
      src={src}
      opacity={opacity}
      zIndex={zIndex}
      style={style}
    />
  );
}

export default Background;
