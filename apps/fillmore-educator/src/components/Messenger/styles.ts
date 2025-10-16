import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 380px;
  background: var(--white);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 24px var(--black-20);
  z-index: 900;
`;

export default {
  Container,
};
