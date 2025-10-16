import { CloseButton, HStack, VStack, Text } from '@fillmore/ui';
import { progressLabelByTaskType } from '../content';
import type { TaskType } from '@/types/task.types';

import S from './styles';

interface HeaderProps {
  roundTitle: string;
  stageTitle: string;
  taskType: TaskType;
  progress: {
    total: number;
    index: number;
  };
  onClose: () => void;
}

function Header({
  roundTitle,
  stageTitle,
  taskType,
  progress,
  onClose,
}: HeaderProps) {
  return (
    <S.Header>
      <HStack justify="space-between" fullWidth>
        <VStack>
          <Text as="h1" size={32} color="var(--white)">
            {roundTitle}
          </Text>
          <Text as="span" size={16} color="var(--white)">
            {stageTitle}
          </Text>
        </VStack>
        <CloseButton onClick={onClose} />
      </HStack>
      <VStack gap={4}>
        <S.ProgressBlockWrapper>
          {Array.from({ length: progress.total }).map((_, index) => (
            <S.ProgressBlock
              key={index}
              taskType={taskType}
              isActive={index <= progress.index}
            />
          ))}
        </S.ProgressBlockWrapper>
        <HStack justify="space-between" fullWidth>
          <Text as="span" size={16} color="var(--white)">
            {progressLabelByTaskType[taskType](progress.index)}
          </Text>
          <Text as="span" size={16} color="var(--white)">
            {progress.index + 1}/{progress.total}
          </Text>
        </HStack>
      </VStack>
    </S.Header>
  );
}

export default Header;
