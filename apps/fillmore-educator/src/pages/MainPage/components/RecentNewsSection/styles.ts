import styled from '@emotion/styled';

const ModalContent = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const CloseButton = styled.button`
  background: var(--red);
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default {
  ModalContent,
  CloseButton,
};
