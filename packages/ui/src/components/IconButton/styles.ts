import styled from '@emotion/styled';

const Container = styled.button<{ disabled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  width: 32px;
  height: 32px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'transparent' : 'rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    background-color: ${({ disabled }) =>
      disabled ? 'transparent' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

export default {
  Container,
};
