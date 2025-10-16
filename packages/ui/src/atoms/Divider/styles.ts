import styled from '@emotion/styled';

interface DividerStyledProps {
  direction: 'horizontal' | 'vertical';
  length: number | string;
  thickness: number;
  color: string;
}

const Divider = styled.div<DividerStyledProps>`
  background-color: ${({ color }) => color};

  ${({ direction, length, thickness }) => {
    if (direction === 'horizontal') {
      return `
        width: ${typeof length === 'number' ? `${length}px` : length};
        height: ${thickness}px;
      `;
    } else {
      return `
        width: ${thickness}px;
        height: ${typeof length === 'number' ? `${length}px` : length};
      `;
    }
  }}
`;

export default {
  Divider,
};
