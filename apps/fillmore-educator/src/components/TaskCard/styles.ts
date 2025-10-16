import styled from '@emotion/styled';
import type { TaskType } from '@/types/task.types';
import { getTaskColors } from '@/lib/presenters/taskStyles';

const CardContainer = styled.div<{ type: TaskType; isCompleted: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  background: ${({ isCompleted }) =>
    isCompleted ? 'var(--white-20)' : 'var(--white-50)'};
  border-radius: 4px;
  padding: 8px 8px 8px 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(
      to bottom,
      ${({ type, isCompleted }) => getTaskColors(type, isCompleted)}
    );
  }
`;

const CompletedBadge = styled.span`
  font-size: 10px;
  font-weight: bold;
  line-height: 18px;
  color: transparent;
  background: linear-gradient(135deg, #0dd4e6 0%, #00e9be 100%) no-repeat
    center/cover;
  background-size: 100% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default {
  CardContainer,
  CompletedBadge,
};
