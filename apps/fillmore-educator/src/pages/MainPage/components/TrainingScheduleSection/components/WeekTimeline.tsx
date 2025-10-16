import React from 'react';
import S from '../styles';
import { HStack, Divider, Text } from '@fillmore/ui';

interface WeekTimelineProps {
  weeksCount: number;
  daysPerWeek: number;
}

const WeekTimeline: React.FC<WeekTimelineProps> = ({
  weeksCount,
  daysPerWeek,
}) => {
  const generateDayDividers = () => {
    return Array.from({ length: daysPerWeek + 1 }, (_, dayIndex) => {
      const isVisible = dayIndex !== 0 && dayIndex !== daysPerWeek;
      return (
        <Divider
          key={dayIndex}
          direction="vertical"
          length={8}
          thickness={1}
          color="var(--light-gray)"
          style={{ opacity: isVisible ? 1 : 0 }}
        />
      );
    });
  };

  const generateWeeks = () => {
    return Array.from({ length: weeksCount }, (_, weekIndex) => {
      const weekNumber = weekIndex + 1;
      return (
        <S.WeekColumn key={weekNumber} isFirst={weekNumber === 1}>
          <HStack
            justify="space-between"
            fullWidth={true}
            style={{ marginBottom: '8px' }}
          >
            {generateDayDividers()}
          </HStack>
          <Text as="b" size={10} weight="bold">
            WEEK {weekNumber}
          </Text>
        </S.WeekColumn>
      );
    });
  };

  return <S.WeekGrid>{generateWeeks()}</S.WeekGrid>;
};

export default WeekTimeline;
