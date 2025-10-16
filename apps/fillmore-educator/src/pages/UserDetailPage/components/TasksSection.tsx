import React, { useState } from 'react';
import { VStack, HStack, Button, Text } from '@fillmore/ui';
import TaskCard from '@/components/TaskCard';
import type { Task } from '@/types/task.types';

interface TasksSectionProps {
  currentTasks: Task[];
  allTasks: Task[];
}

const TasksSection: React.FC<TasksSectionProps> = ({
  currentTasks,
  allTasks,
}) => {
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const tasksToShow = showFullSchedule ? allTasks : currentTasks;

  return (
    <VStack gap={12} fullWidth={true}>
      <Text as="b" size={16} weight="bold">
        Tasks
      </Text>
      <Text as="b" size={12} weight="bold">
        Due February 26th
      </Text>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          width: '100%',
        }}
      >
        {tasksToShow.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            content={task.content}
            type={task.type}
            isCompleted={task.isCompleted}
          />
        ))}
      </div>

      <HStack justify="space-between" gap={16}>
        <div
          style={{
            borderBottom: '1px dashed var(--light-gray)',
            flexGrow: '1',
          }}
        />
        <Button
          variant="light"
          onClick={() => setShowFullSchedule(!showFullSchedule)}
        >
          {showFullSchedule ? 'Show Current Tasks' : 'View Full Task Schedule'}
        </Button>
        <div
          style={{
            borderBottom: '1px dashed var(--light-gray)',
            flexGrow: '1',
          }}
        />
      </HStack>
    </VStack>
  );
};

export default TasksSection;
