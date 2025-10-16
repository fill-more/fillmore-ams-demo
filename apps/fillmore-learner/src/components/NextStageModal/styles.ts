import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const MotionOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--black-70);
  backdrop-filter: blur(16px);
`;

const MotionContent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  overflow: hidden;
  margin: 140px auto 0 auto;
`;

const Content = styled.div`
  flex: 1;
  margin: 160px 0 80px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow: scroll;
`;

export default {
  MotionOverlay,
  MotionContent,
  Content,
};
