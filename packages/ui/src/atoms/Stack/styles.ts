import styled from '@emotion/styled';

const Container = styled.div<{
  direction: 'row' | 'column';
  gap: number;
  align: 'start' | 'center' | 'end' | 'stretch';
  justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  fullWidth: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap}px;
  align-items: ${({ align, direction }) => {
    switch (align) {
      case 'start':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'stretch':
        return 'stretch';
      default:
        return direction === 'row' ? 'center' : 'stretch';
    }
  }};
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'start':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'space-between':
        return 'space-between';
      case 'space-around':
        return 'space-around';
      default:
        return 'flex-start';
    }
  }};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export default {
  Container,
};
