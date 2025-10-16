import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--black-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(motion.div)`
  background-color: var(--white);
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 16px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  background: var(--red);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export default {
  ModalOverlay,
  ModalContainer,
  CloseButton,
};
