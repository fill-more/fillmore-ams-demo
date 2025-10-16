import styled from '@emotion/styled';

const ProgressContainer = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: var(--dark-gray);
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  transition: width 0.3s ease-in-out;
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background: linear-gradient(to right, #008fcc, #0dd4e6);
`;

export default {
  ProgressContainer,
  ProgressFill,
};
