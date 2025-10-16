import styled from '@emotion/styled';

interface ContainerProps {
  padding?: string;
  noPadding?: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: ${({ padding }) => padding || '16px 16px 0 16px'};
  border-radius: 5px;
  background-color: var(--white-20);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default {
  Container,
};
