import type { TaskType } from '@/types/task.types';
import { getTaskColors } from '@/lib/presenters/taskStyles';
import styled from '@emotion/styled';

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10;
`;

const CloseButton = styled.button`
  background: var(--red);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ProgressBlockWrapper = styled.div`
  width: 100%;
  height: 10px;
  padding: 3px;
  background: var(--black-20);
  border: 0.5px solid var(--white-30);

  display: flex;
  gap: 2px;
`;

const ProgressBlock = styled.div<{ isActive?: boolean; taskType: TaskType }>`
  flex: 1;
  height: 100%;
  background: ${({ isActive = true, taskType }) =>
    isActive
      ? `linear-gradient(to right, ${getTaskColors(taskType)})`
      : 'var(--white-20)'};
`;

export default {
  Header,
  CloseButton,
  ProgressBlockWrapper,
  ProgressBlock,
};
