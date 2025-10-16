import styled from '@emotion/styled';

const ToggleWrapper = styled.button<{ disabled?: boolean }>`
  width: 64px;
  height: 32px;
  border: none;
  outline: none;
  border-radius: 16px;
  background: var(--light-gray);
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:disabled {
    opacity: 0.6;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--black-20);
    border-radius: 16px;
    pointer-events: none;
  }
`;

const ToggleBackground = styled.img<{ isOn: boolean }>`
  transition: opacity 0.2s;

  width: 100%;
  height: 100%;
  border-radius: 16px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isOn }) => (isOn ? 1 : 0)};
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

const ToggleHandle = styled.div<{ isOn: boolean }>`
  transition: left 0.2s;

  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--white);
  position: absolute;
  top: 3px;
  left: ${({ isOn }) => (isOn ? '35px' : '3px')};
`;

export default {
  ToggleWrapper,
  ToggleBackground,
  ToggleHandle,
};
