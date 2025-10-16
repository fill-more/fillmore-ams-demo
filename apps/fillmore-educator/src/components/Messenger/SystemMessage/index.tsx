import { VStack, Text } from '@fillmore/ui';
import TaskCard from '@/components/TaskCard';
import type { TaskType } from '@/types/task.types';

interface SystemMessageProps {
  message: string;
  task: {
    title: string;
    content: string;
    type: TaskType;
    isCompleted?: boolean;
  };
}

function SystemMessage({ message, task }: SystemMessageProps) {
  return (
    <VStack gap={4} align="center">
      <Text as="b" size={10} weight="bold">
        {message}
      </Text>
      <TaskCard
        title={task.title}
        content={task.content}
        type={task.type}
        isCompleted={task.isCompleted ?? false}
      />
    </VStack>
  );
}

export default SystemMessage;
