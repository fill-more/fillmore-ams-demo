import { useState } from 'react';
import ContentContainer from '@/components/ContentContainer';

import TrainingProgressBar from './components/TrainingProgressBar';
import WeekTimeline from './components/WeekTimeline';
import WeekDetails from './components/WeekDetails';
import S from './styles';
import { HStack, VStack, Text } from '@fillmore/ui';

const TrainingScheduleSection = () => {
  const [progressPercentage] = useState(15);
  const [weeksCount] = useState(4);
  const [daysPerWeek] = useState(7);

  const weekDetails = {
    title: 'Week 1 (September 3-9): Foundation Building',
    schedule: [
      {
        days: 'Day 1-3',
        description:
          'Computers and networking. Understand the basic components of a network and the different types of network traffic.',
      },
      {
        days: 'Day 4-5',
        description:
          'Become familiar with security concepts, including the CIA triad (confidentiality, integrity, and availability)',
      },
      {
        days: 'Day 6-7',
        description:
          'Programming. Develop basic programming knowledge of variables, data types, and control flow.',
      },
    ],
  };

  return (
    <ContentContainer title="Training Schedule Timeline">
      <HStack fullWidth={true} gap={40}>
        <VStack fullWidth={true}>
          <Text as="b" size={12} weight="bold">
            February 2024 Study Schedule:
          </Text>
          <S.TimelineContainer>
            <Text as="span" size={10} weight="bold" color="var(--gray)">
              TRAINING PROGRESS
            </Text>
            <TrainingProgressBar percentage={progressPercentage} />
            <WeekTimeline weeksCount={weeksCount} daysPerWeek={daysPerWeek} />
          </S.TimelineContainer>
        </VStack>
        <WeekDetails
          title={weekDetails.title}
          schedule={weekDetails.schedule}
        />
      </HStack>
    </ContentContainer>
  );
};

export default TrainingScheduleSection;
