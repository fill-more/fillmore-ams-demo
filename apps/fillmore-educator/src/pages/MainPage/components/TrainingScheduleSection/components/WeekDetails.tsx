import React from 'react';
import DayScheduleItem from './DayScheduleItem';
import { VStack, Text } from '@fillmore/ui';

interface ScheduleItem {
  days: string;
  description: string;
}

interface WeekDetailsProps {
  title: string;
  schedule: readonly ScheduleItem[];
}

const WeekDetails: React.FC<WeekDetailsProps> = ({ title, schedule }) => {
  return (
    <VStack gap={4}>
      <Text
        as="b"
        size={12}
        weight="bold"
        style={{
          padding: '8px 0',
          borderBottom: '2px solid var(--light-gray)',
        }}
      >
        {title}
      </Text>

      {schedule.map((item, index) => (
        <DayScheduleItem
          key={index}
          days={item.days}
          description={item.description}
        />
      ))}
    </VStack>
  );
};

export default WeekDetails;
