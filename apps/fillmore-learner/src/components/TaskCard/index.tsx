import React from 'react';

import { Text } from '@fillmore/ui';

import type { TaskType } from '@/types/task.types';

import S from './styles';

interface TaskCardProps {
  title: string;
  content: string;
  type: TaskType;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, content, type }) => {
  return (
    <S.CardContainer type={type}>
      <Text as="h3" size={12} weight="bold" color="var(--white)">
        {title}
      </Text>
      <Text as="p" size={12} color="var(--white)">
        {content}
      </Text>
    </S.CardContainer>
  );
};

export default TaskCard;
