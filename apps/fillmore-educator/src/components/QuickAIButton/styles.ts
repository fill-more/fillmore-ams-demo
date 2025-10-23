import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleBorder = styled.div<{
  width: number;
  height: number;
  isOpen: boolean;
}>`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: ${(props) =>
    props.isOpen ? 'none' : '1px solid var(--light-gray-80)'};
  border-radius: 50%;
  transition: background-color 0.3s ease;
  pointer-events: none;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  z-index: 1;
  cursor: pointer;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 168px;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  background: linear-gradient(
    to left,
    transparent 10%,
    var(--black-50) 20%,
    var(--black) 40%,
    var(--black) 60%,
    var(--black-50) 80%,
    transparent 90%
  );
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};

  z-index: 1000;

  &:before {
    content: '';
    position: fixed;
    inset: 0;
    background-color: var(--black-40);
  }

  &:after {
    z-index: -1;
    content: '';
    position: absolute;
    left: 50%;
    bottom: -24px;
    background: var(--black-90);
    width: 48px;
    height: 48px;
    transform: translateX(-50%) rotate(45deg);
  }
`;

const Message = styled.div<{ $sender: 'user' | 'ai' }>`
  padding: 8px;
  border-radius: 4px;
  white-space: pre-wrap;
  background-color: ${({ $sender }) =>
    $sender === 'user' ? 'var(--white)' : '#0DD4E6'};
  color: var(--black);
  text-align: ${({ $sender }) => ($sender === 'user' ? 'right' : 'left')};
`;

const LoadingMessage = styled.div`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #0dd4e6;
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
`;

const LoadingDot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--white);
  animation: bounce 1.4s infinite ease-in-out both;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default {
  Container,
  CircleWrapper,
  CircleBorder,
  Logo,
  Overlay,
  Message,
  LoadingMessage,
  LoadingDot,
};
