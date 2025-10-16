import styled from '@emotion/styled';

const BackgroundImage = styled.img<{ opacity?: number; zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ opacity }) => opacity || 1};
  z-index: ${({ zIndex }) => zIndex || -1};
  pointer-events: none;
`;

export default {
  BackgroundImage,
};
