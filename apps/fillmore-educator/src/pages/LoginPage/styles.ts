import styled from '@emotion/styled';
import { FadeIn } from '@fillmore/ui';

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
`;

const BackgroundWrapper = styled.div`
  animation: ${FadeIn(0.2)} 1s 1s forwards ease-in-out;
  opacity: 0;
`;

const Logo = styled.img`
  animation: ${FadeIn(1)} 1s 1s forwards ease-in-out;

  width: 300px;
  height: auto;
  opacity: 0;
`;

const LoginForm = styled.div`
  animation: ${FadeIn(1)} 1s 2s forwards ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 49px;

  opacity: 0;
`;

const Copyright = styled.span`
  animation: ${FadeIn(1)} 1s ease-in-out;

  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);

  font-size: 10px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.2);
`;

export default {
  Container,
  BackgroundWrapper,
  Logo,
  LoginForm,
  Copyright,
};
