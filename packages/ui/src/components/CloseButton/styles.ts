import styled from '@emotion/styled';

const CloseButton = styled.button`
  background: var(--red);
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const XIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

export default {
  CloseButton,
  XIcon,
};
