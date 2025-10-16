import React, { useState } from 'react';
import S from './styles';
import { HStack, VStack, Text } from '@fillmore/ui';
import TraineeChart from '@/components/TraineeChart';
import ContentContainer from '@/components/ContentContainer';

const ProgressSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'alert' | 'recommendation'>(
    'alert'
  );

  const contentData = {
    alert: {
      title: 'Action needed: 1 trainee is falling significantly behind.',
      description:
        'Private Brown has completed 32% of the Introduction to Cybersecurity course and is at risk of not completing the training on time. Recommendation - Consider peer mentoring with Private Henderson who has completed 93% of the course. Additionally, the following trainees are also in the bottom 20% of the cohort and should receive the following assistance…',
    },
    recommendation: {
      title:
        'Recommended action: Pair top runner with underperforming trainee.',
      description:
        'In general, pairing top performers with underperforming trainees have historically been shown to be effective. Study buddy system allows for more engaging and fun dialogues between peers, with reduced levels of stress. Mutual motivation also encourages a higher degree of effort from all participants. Better teamwork and personal bond are additional benefits of the methodology as well.',
    },
  };

  const handleClickButton = (type: 'alert' | 'recommendation') => {
    setSelectedType(type);
  };

  const currentContent = contentData[selectedType];

  return (
    <ContentContainer title="Overall Team Progress" style={{ width: '100%' }}>
      <HStack gap={4}>
        <Text as="span" size={12}>
          Team Progress:{' '}
        </Text>
        <Text as="b" size={12} weight="bold">
          February 19th ~ February 26th{' '}
        </Text>
      </HStack>
      <HStack gap={12}>
        <Text as="b" size={12} weight="bold">
          We are 72% on schedule.
        </Text>
        <S.AlertButton
          isSelected={selectedType === 'alert'}
          onClick={() => handleClickButton('alert')}
        >
          1 alert
        </S.AlertButton>
        <S.RecommendationButton
          isSelected={selectedType === 'recommendation'}
          onClick={() => handleClickButton('recommendation')}
        >
          1 recommendation
        </S.RecommendationButton>
      </HStack>
      <VStack gap={4}>
        <Text as="b" size={12} weight="bold">
          {currentContent.title}
        </Text>
        <Text as="span" size={12}>
          {currentContent.description}
        </Text>
      </VStack>
      <TraineeChart />
    </ContentContainer>
  );
};

export default ProgressSection;
