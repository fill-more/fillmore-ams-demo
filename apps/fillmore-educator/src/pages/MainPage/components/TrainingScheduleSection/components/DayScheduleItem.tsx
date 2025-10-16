import React from 'react';
import { HStack, Divider, Text } from '@fillmore/ui';

interface DayScheduleItemProps {
  days: string;
  description: string;
}

const DayScheduleItem: React.FC<DayScheduleItemProps> = ({
  days,
  description,
}) => {
  return (
    <HStack align="stretch" gap={8} style={{ padding: '8px 0' }}>
      <Text
        as="b"
        size={12}
        weight="bold"
        style={{
          minWidth: '52px',
          alignSelf: 'center',
        }}
      >
        {days}
      </Text>
      <Divider
        direction="vertical"
        length="100%"
        thickness={1}
        color="var(--light-gray)"
      />
      <Text size={12}>{description}</Text>
    </HStack>
  );
};

export default DayScheduleItem;
