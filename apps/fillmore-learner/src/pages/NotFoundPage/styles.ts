import styled from '@emotion/styled';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #000;
  background-image: radial-gradient(
    1200px 600px at 50% -200px,
    rgba(255, 255, 255, 0.06),
    rgba(0, 0, 0, 0)
  );
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 32px 28px;
  width: 100%;
  max-width: 560px;
  text-align: center;
`;

const S = { Container, Card };
export default S;
