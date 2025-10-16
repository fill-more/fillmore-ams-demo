import { useState } from 'react';
import { HStack, VStack, Text } from '@fillmore/ui';
import { useTrainee } from '@/hooks/useTrainee';
import type { TaskType } from '@/types/task.types';
import GradingHeader from './components/GradingHeader';
import GradingFilters from './components/GradingFilters';
import GradingLegend from './components/GradingLegend';
import LearnerGradingItem from './components/LearnerGradingItem';

function TraineeGradingPage() {
  const [taskType, setTaskType] = useState('all');
  const [performance, setPerformance] = useState('best');
  const { trainees } = useTrainee();

  return (
    <VStack
      gap={32}
      fullWidth={true}
      style={{ padding: '84px 40px', minHeight: '100vh' }}
    >
      <GradingHeader />
      <VStack align="center" fullWidth={true}>
        <VStack gap={20} style={{ width: '900px' }}>
          <VStack gap={12}>
            <Text as="b" size={12} weight="bold">
              Cumulative scoring methodology:{' '}
            </Text>
            <Text as="p" size={12}>
              The learner is graded through a combination of test scores,
              pacing, completion rate, and written and verbal interactions
              during course material engagement.
            </Text>
          </VStack>
          <HStack justify="space-between">
            <GradingFilters
              taskType={taskType}
              performance={performance}
              onTaskTypeChange={setTaskType}
              onPerformanceChange={setPerformance}
            />
            <GradingLegend />
          </HStack>
          {/* Display filtered and sorted learners */}
          {trainees
            .sort((a, b) => {
              // Sorting logic based on Task Type
              let aValue: number, bValue: number;

              if (taskType === 'all') {
                // Sort by overallPercentage if 'all' is selected
                aValue = a.overallPercentage;
                bValue = b.overallPercentage;
              } else {
                // Sort by specific Task Type percentage
                aValue =
                  a.taskProgress[taskType as keyof typeof a.taskProgress];
                bValue =
                  b.taskProgress[taskType as keyof typeof b.taskProgress];
              }

              // Sorting direction based on Performance
              return performance === 'best' ? bValue - aValue : aValue - bValue;
            })
            .map((learner, index) => (
              <LearnerGradingItem
                key={learner.id}
                learner={learner}
                rank={index + 1}
                highlightedTaskType={
                  taskType === 'all' ? undefined : (taskType as TaskType)
                }
              />
            ))}
        </VStack>
      </VStack>
    </VStack>
  );
}

export default TraineeGradingPage;
