import React from 'react';
import ContentContainer from '@/components/ContentContainer';

import { HStack, VStack, Text } from '@fillmore/ui';
import TaskCard from '@/components/TaskCard';

const TrainingContentSuggestionsSection: React.FC = () => {
  return (
    <ContentContainer title="Training Content Suggestions">
      <VStack
        gap={8}
        align="start"
        style={{
          height: '200px',
          overflow: 'scroll',
          paddingBottom: '24px',
        }}
      >
        <Text as="b" size={12} weight="bold">
          Incident Response Drills
        </Text>
        <Text as="p" size={12}>
          Organize tabletop exercises and simulated cyber incident scenarios to
          train personnel in responding effectively to security breaches. This
          includes identifying the incident, containing it, mitigating damage,
          and documenting the response for future improvements.
        </Text>
        <HStack gap={8} fullWidth={true} style={{ marginTop: '12px' }}>
          <TaskCard
            title="Ransomware attack"
            content="This drill would involve the following steps: 1) team lead would announce that a"
            type="training"
          />
          <TaskCard
            title="Data breach"
            content="This drill would involve the following steps: 1) team lead would announce that a data"
            type="training"
          />
        </HStack>
      </VStack>
    </ContentContainer>
  );
};

export default TrainingContentSuggestionsSection;
