import styled from '@emotion/styled';
import { FadeInUpCentered } from '@fillmore/ui/src/styles/animations';

interface StageAnchorProps {
  $animationDelay: number;
}

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
`;

const StageAnchor = styled.div<StageAnchorProps>`
  transition: scale 0.2s ease-out;
  position: absolute;
  transform: translate(-50%, -50%);

  opacity: 0;
  animation: ${FadeInUpCentered(20, 0.8)} 0.3s ease-out forwards;
  animation-delay: ${({ $animationDelay }) => ($animationDelay - 1) * 0.1}s;

  cursor: pointer;
  pointer-events: auto;

  &:hover {
    scale: 1.1;
  }
`;

export default {
  Layer,
  StageAnchor,
};
