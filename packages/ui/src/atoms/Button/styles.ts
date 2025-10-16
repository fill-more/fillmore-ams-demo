import styled from '@emotion/styled';

const ButtonContainer = styled.button<{
  variant: 'light' | 'dark';
  filled: boolean;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>`
  display: flex;
  position: relative;
  justify-content: center;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 7px 16px;
          font-size: 14px;
        `;
      case 'medium':
        return `
          padding: 15px 20px;
          font-size: 14px;
        `;
      case 'large':
        return `
          padding: 21px 32px;
          font-size: 16px;
        `;
      default:
        return `
          padding: 15px 20px;
          font-size: 14px;
        `;
    }
  }}
  border: 1px solid
    ${({ variant }) =>
    variant === 'light' ? 'var(--black-20)' : 'var(--white-20)'};
  border-radius: 32px;
  background: transparent;
  cursor: pointer;

  color: ${({ variant }) =>
    variant === 'light' ? 'var(--black)' : 'var(--white)'};
  font-weight: ${({ filled }) => (filled ? 'bold' : 'normal')};

  ${({ filled }) => {
    return filled
      ? `
      color: var(--white);
      background-image: linear-gradient(135deg, #0DD4E6 0%, #00E9BE 100%);
      background-repeat: no-repeat;
      background-size: 110% 300%;
      background-position: center;
      border: 1px solid transparent;
      `
      : '';
  }}

  &:not(:disabled):hover {
    color: ${({ variant }) =>
      variant === 'light' ? 'var(--black)' : 'var(--white)'};
    background: transparent;
    &::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, #0dd4e6 0%, #00e9be 100%) no-repeat
        center/cover;
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
    }
  }

  &:not(:disabled):active {
    background: var(--black);
    color: var(--white);
    &::before {
      opacity: 0;
    }
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &::before {
      display: none;
    }
  }
`;

export default {
  ButtonContainer,
};
