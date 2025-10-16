import React from 'react';
import { HStack, Dropdown } from '@fillmore/ui';

const taskTypeOptions = [
  {
    value: 'all',
    label: 'All Task Types',
  },
  {
    value: 'training',
    label: 'Training',
  },
  {
    value: 'reading',
    label: 'Reading',
  },
  {
    value: 'practice',
    label: 'Practice',
  },
];

const performanceOptions = [
  {
    value: 'best',
    label: 'Best Performance',
  },
  {
    value: 'worst',
    label: 'Worst Performance',
  },
];

interface GradingFiltersProps {
  taskType: string;
  performance: string;
  onTaskTypeChange: (value: string) => void;
  onPerformanceChange: (value: string) => void;
}

const GradingFilters: React.FC<GradingFiltersProps> = ({
  taskType,
  performance,
  onTaskTypeChange,
  onPerformanceChange,
}) => {
  return (
    <HStack gap={12}>
      <Dropdown
        options={taskTypeOptions}
        value={taskType}
        onChange={onTaskTypeChange}
      />
      <Dropdown
        options={performanceOptions}
        value={performance}
        onChange={onPerformanceChange}
      />
    </HStack>
  );
};

export default GradingFilters;
