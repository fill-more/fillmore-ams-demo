import styled from '@emotion/styled';

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 12px 16px 12px;
  border-radius: 5px;
  background: var(--black-50);
  box-shadow: 0 10px 20px var(--black-20);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #0dd4e6 0%, #00e9be 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;

export default {
  Card,
};
