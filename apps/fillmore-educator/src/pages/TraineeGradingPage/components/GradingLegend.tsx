import React from 'react';
import { HStack, Text } from '@fillmore/ui';
import { getTaskColors } from '@/lib/presenters/taskStyles';

const GradingLegend: React.FC = () => {
  return (
    <HStack gap={32}>
      <HStack align="center" gap={8}>
        <div
          style={{
            width: '12px',
            height: '12px',
            background: `linear-gradient(to right, ${getTaskColors('training')})`,
          }}
        />
        <Text as="b" size={10} weight="bold">
          TRAINING TASKS
        </Text>
      </HStack>
      <HStack align="center" gap={8}>
        <div
          style={{
            width: '12px',
            height: '12px',
            background: `linear-gradient(to right, ${getTaskColors('reading')})`,
          }}
        />
        <Text as="b" size={10} weight="bold">
          READING TASKS
        </Text>
      </HStack>
      <HStack align="center" gap={8}>
        <div
          style={{
            width: '12px',
            height: '12px',
            background: `linear-gradient(to right, ${getTaskColors('practice')})`,
          }}
        />
        <Text as="b" size={10} weight="bold">
          PRACTICE TASKS
        </Text>
      </HStack>
    </HStack>
  );
};

export default GradingLegend;
