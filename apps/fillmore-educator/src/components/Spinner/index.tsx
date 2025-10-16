import styled from '@emotion/styled';
import { Spin } from '@fillmore/ui';

const SpinnerCircle = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid #e1e5e9;
  border-top: 2px solid var(--red);
  border-radius: 50%;
  animation: ${Spin} 1s linear infinite;
`;

function Spinner() {
  return <SpinnerCircle />;
}

export default Spinner;
