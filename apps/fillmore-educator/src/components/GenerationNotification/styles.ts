import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const NotificationContainer = styled(motion.div)<{ isClickable?: boolean }>`
  position: fixed;
  top: 140px;
  right: 0px;
  width: 280px;
  background: var(--black);
  box-shadow: 0 8px 32px var(--white-10);
  z-index: 999;
  overflow: hidden;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  transition: transform 0.2s ease;
`;

const LogoContainer = styled.div<{ isCompleted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  transition: filter 0.3s ease;
`;

const Logo = styled.img<{ isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  filter: ${({ isCompleted }) =>
    isCompleted ? 'none' : 'saturate(0) brightness(5)'};
  transition: filter 0.3s ease;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: var(--white-20);
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-image: linear-gradient(to right, #008fcc, #0dd4e6);
  transition: width 0.5s ease;
`;

export default {
  NotificationContainer,
  LogoContainer,
  Logo,
  ProgressContainer,
  ProgressBar,
};
