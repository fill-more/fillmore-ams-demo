import React from 'react';

import { HStack, Text } from '@fillmore/ui';

import type { Task } from '@/types/task.types';

import S from './styles';

type TaskCardProps = Task;

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  content,
  isCompleted = false,
  type,
}) => {
  const contentOpacity = isCompleted ? 0.3 : 1;

  return (
    <S.CardContainer type={type} isCompleted={isCompleted}>
      <HStack align="start" justify="space-between">
        <Text
          as="h3"
          size={12}
          weight="bold"
          style={{ opacity: contentOpacity }}
        >
          {title}
        </Text>
        {isCompleted && <S.CompletedBadge>COMPLETED!</S.CompletedBadge>}
      </HStack>
      <Text as="p" size={12} style={{ opacity: contentOpacity }}>
        {content}
      </Text>
    </S.CardContainer>
  );
};

export default TaskCard;
