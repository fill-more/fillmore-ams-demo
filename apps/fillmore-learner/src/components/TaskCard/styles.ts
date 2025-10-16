import styled from '@emotion/styled';
import type { TaskType } from '@/types/task.types';
import { getTaskColors } from '@/lib/presenters/taskStyles';

const CardContainer = styled.div<{ type: TaskType }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 4px;
  padding: 8px 8px 8px 12px;
  overflow: hidden;
  backdrop-filter: blur(4px);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(
      to bottom,
      ${({ type }) => getTaskColors(type)}
    );
  }
`;

export default {
  CardContainer,
};
