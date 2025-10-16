import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideAnimation = (position: number) => keyframes`
  from {
    left: 0%;
    opacity: 0;
  }
  to {
    left: ${position}%;
    opacity: 1;
  }
`;

const UserProfileContainer = styled.div<{ position: number }>`
  position: absolute;
  bottom: -4px;
  left: 0%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  animation: ${({ position }) => slideAnimation(position)} 1.5s ease-out
    forwards;
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: var(--red);
  border-radius: 50%;
`;

const ConnectingLine = styled.div<{ isTopPerformer: boolean }>`
  width: 2px;
  height: ${({ isTopPerformer }) => (isTopPerformer ? '20' : '14')}px;
  background-image: linear-gradient(to bottom, var(--dark-gray), var(--red));
`;

export default {
  UserProfileContainer,
  ProgressDot,
  ConnectingLine,
};
