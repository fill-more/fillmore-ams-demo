import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div<{ top: string; left: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto !important;
  display: flex;
  animation: ${fadeIn} 1s 0.5s ease forwards;
  opacity: 0;
`;

const Icon = styled.img`
  transition: all 0.3s ease;
  width: 12px;
  height: 12px;
  cursor: pointer;
  pointer-events: auto !important;

  &:hover {
    width: 24px;
    height: 24px;
  }
`;

export default {
  Container,
  Icon,
};
