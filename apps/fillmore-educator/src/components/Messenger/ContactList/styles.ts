import styled from '@emotion/styled';

const CloseButton = styled.button`
  background: var(--red);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-left: 4px;
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 280px;
`;

export default {
  CloseButton,
  ListContainer,
};
