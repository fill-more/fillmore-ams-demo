import styled from '@emotion/styled';

const TimelineContainer = styled.div`
  margin: 18px 0 0 12px;
`;

const ProgressContainer = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  padding: 3px;
  border: 1px solid var(--light-gray);
`;

const ProgressBar = styled.div<{ percentage: number }>`
  position: relative;
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-image: linear-gradient(to right, #008fcc, #0dd4e6);
`;

const PopoverWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 24px;
`;

const WeekGrid = styled.div`
  display: flex;
  border-left: 1px solid var(--light-gray);
  border-right: 1px solid var(--light-gray);
`;

const WeekColumn = styled.div<{ isFirst: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  border-left: ${({ isFirst }) =>
    isFirst ? 'none' : '1px solid var(--light-gray)'};
`;

export default {
  TimelineContainer,
  ProgressContainer,
  ProgressBar,
  PopoverWrapper,
  WeekGrid,
  WeekColumn,
};
