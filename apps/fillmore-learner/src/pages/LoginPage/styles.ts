import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Copyright = styled.span`
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);

  font-size: 10px;
  font-weight: bold;
  color: var(--black-20);
`;

export default {
  Container,
  Logo,
  LoginForm,
  Copyright,
};
