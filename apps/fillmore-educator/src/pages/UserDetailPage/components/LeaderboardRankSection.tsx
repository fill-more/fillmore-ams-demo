import React, { useMemo } from 'react';
import ContentContainer from '@/components/ContentContainer';

import { useTrainee } from '@/hooks/useTrainee';
import S from '../styles';
import TraineeList from '@/components/TraineeList';

interface LeaderboardRankSectionProps {
  currentUserId: string;
}

const LeaderboardRankSection: React.FC<LeaderboardRankSectionProps> = ({
  currentUserId,
}) => {
  const { trainees } = useTrainee();

  const sortedTrainees = useMemo(() => {
    return [...trainees].sort(
      (a, b) => b.overallPercentage - a.overallPercentage
    );
  }, [trainees]);

  return (
    <ContentContainer title="Leaderboard Rank" padding="16px 0">
      <S.TraineeListContainer>
        <TraineeList trainees={sortedTrainees} currentUserId={currentUserId} />
      </S.TraineeListContainer>
    </ContentContainer>
  );
};

export default LeaderboardRankSection;
