import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type TextWeight = 'regular' | 'bold';

const sizeToLineHeight: Record<number, number> = {
  34: 42,
  26: 32,
  24: 32,
  22: 27,
  16: 22,
  14: 18,
  12: 16,
  10: 18,
};

const cssFromSizeWeight = (size?: number, weight?: TextWeight) => {
  const fontSize =
    typeof size === 'number' && Number.isFinite(size) ? size : undefined;
  const lineHeight =
    fontSize != null
      ? (sizeToLineHeight[fontSize] ?? Math.round(fontSize * 1.33))
      : undefined;
  const fontWeight: number | undefined =
    weight === 'bold' ? 700 : weight === 'regular' ? 400 : undefined;
  return css`
    ${fontSize != null ? `font-size: ${fontSize}px;` : ''}
    ${lineHeight != null ? `line-height: ${lineHeight}px;` : ''}
    ${fontWeight != null ? `font-weight: ${fontWeight};` : ''}
  `;
};

const TextBase = styled.span<{
  $size?: number;
  $weight?: TextWeight;
  $color?: string;
}>`
  margin: 0;
  padding: 0;
  ${({ $size, $weight }) => cssFromSizeWeight($size, $weight)}
  ${({ $color }) => ($color ? `color: ${$color};` : '')}
`;

export default { TextBase };
