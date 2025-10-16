import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const progressAnimation = keyframes`
  from {
    stroke-dashoffset: var(--circumference);
  }
  to {
    stroke-dashoffset: var(--final-offset);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  padding: 32px 12px 12px 12px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(4px);
  width: 100%;
`;

const CircularProgress = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressCircle = styled.circle<{
  finalOffset: number;
  circumference: number;
}>`
  animation: ${progressAnimation} 2.5s cubic-bezier(0.5, 0, 0, 1) forwards;
  --final-offset: ${(props) => props.finalOffset}px;
  --circumference: ${(props) => props.circumference}px;
`;

export default {
  Container,
  CircularProgress,
  ProgressCircle,
};
