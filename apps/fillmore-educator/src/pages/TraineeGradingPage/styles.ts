import styled from '@emotion/styled';
import type { TaskType } from '@/types/task.types';
import { getTaskColors } from '@/lib/presenters/taskStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const ProgressBarContainer = styled.div`
  height: 12px;
  background: var(--black);
  flex: 1;
  display: flex;
`;

const ProgressSegment = styled.div<{
  width: number;
  type: TaskType;
  dimmed?: boolean;
}>`
  width: ${({ width }) => width}%;
  height: 100%;
  background: ${({ type }) =>
    `linear-gradient(to right, ${getTaskColors(type)})`};
  position: relative;
  transition: all 0.3s ease;
  opacity: ${({ dimmed }) => (dimmed ? 0.3 : 1)};
`;

const ProgressLabel = styled.span<{ highlighted?: boolean }>`
  position: absolute;
  left: 50%;
  bottom: -24px;
  transform: translate(-50%);
  font-weight: ${({ highlighted }) => (highlighted ? 'bold' : 'normal')};
`;

export default {
  Container,
  ProgressBarContainer,
  ProgressSegment,
  ProgressLabel,
};
