import React, { useState } from 'react';
import { HStack, VStack, IconButton, Text } from '@fillmore/ui';
import TraineeChart from '@/components/TraineeChart';
import ContentContainer from '@/components/ContentContainer';

import { getTeamAverageProgress } from '@/lib/services/traineeService';
import arrowLeft from '@/assets/arrow-left.svg';
import arrowRight from '@/assets/arrow-right.svg';
import S from '../styles';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import { useTrainee } from '@/hooks/useTrainee';

interface TraineeProgressSectionProps {
  userId: string;
}

const TraineeProgressSection: React.FC<TraineeProgressSectionProps> = ({
  userId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { trainees, getTraineeById } = useTrainee();
  const user = getTraineeById(userId);
  const teamAverage = getTeamAverageProgress(trainees);

  if (!user) return null;

  const recommendedContent = [
    {
      title: `Recommended action: Become more familiar with ransomware removal tools.`,
      description: `Learn about the different types of ransomware removal tools, including decryption tools, backup tools and hybrid tools.`,
    },
    {
      title: `Recommended action for ${formatDisplayName(user.firstName, user.lastName)}.`,
      description: `Based on current progress of ${user.overallPercentage}%, consider pairing with a study buddy or providing additional resources to maintain momentum.`,
    },
  ];

  const currentContent = recommendedContent[currentIndex];
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === recommendedContent.length - 1;

  const handlePrevious = () => {
    if (!isFirstItem) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isLastItem) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <ContentContainer title={'Overall Progress'} style={{ width: '100%' }}>
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
          {user.overallPercentage - teamAverage}% ahead of team average
        </Text>
        <S.RecommendationLabel>1 recommended action</S.RecommendationLabel>
      </HStack>
      <VStack gap={4}>
        <HStack gap={8} align="center" justify="space-between" fullWidth={true}>
          <IconButton onClick={handlePrevious} disabled={isFirstItem}>
            <img src={arrowLeft} alt="Previous" width={24} height={24} />
          </IconButton>

          <VStack gap={4} style={{ flex: 1 }}>
            <HStack gap={8} align="center" justify="space-between">
              <Text as="b" size={12} weight="bold">
                {currentContent.title}
              </Text>
              <Text as="span" size={12} style={{ color: 'var(--black-50)' }}>
                {currentIndex + 1} / {recommendedContent.length}
              </Text>
            </HStack>
            <Text as="span" size={12}>
              {currentContent.description}
            </Text>
          </VStack>

          <IconButton onClick={handleNext} disabled={isLastItem}>
            <img src={arrowRight} alt="Next" width={24} height={24} />
          </IconButton>
        </HStack>
      </VStack>
      <TraineeChart trainees={[user]} />
    </ContentContainer>
  );
};

export default TraineeProgressSection;
