import styled from '@emotion/styled';
import { FadeIn } from '@fillmore/ui';

const TraineeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TeamAverageIndicator = styled.div<{ position: number }>`
  position: absolute;
  left: ${({ position }) => position}%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  opacity: 0;
  animation: ${FadeIn(1)} 1s ease-out 1s forwards;
`;

const TeamAverageLine = styled.div`
  width: 1px;
  position: relative;
  margin-top: 16px;
  background-color: var(--black);
  height: 0;
  animation: growLine 1s ease-out 1s forwards;

  @keyframes growLine {
    0% {
      height: 0;
    }
    100% {
      height: 140px;
    }
  }
`;

const TeamAverageDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--black);
  position: absolute;
  top: -4px;
  left: -3.5px;
`;

export default {
  TraineeContainer,
  TeamAverageIndicator,
  TeamAverageLine,
  TeamAverageDot,
};
