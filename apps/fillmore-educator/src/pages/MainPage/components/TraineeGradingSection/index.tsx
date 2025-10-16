import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentContainer from '@/components/ContentContainer';

import { PATHNAME } from '@/lib/constants';
import TraineeList from '@/components/TraineeList';
import { useTrainee } from '@/hooks/useTrainee';
import S from './styles';

const TraineeGradingSection: React.FC = () => {
  const navigate = useNavigate();
  const { trainees } = useTrainee();

  const handleClick = () => {
    navigate(PATHNAME.TRAINEE_GRADING);
  };

  const sortedTrainees = useMemo(() => {
    return [...trainees].sort(
      (a, b) => b.overallPercentage - a.overallPercentage
    );
  }, [trainees]);

  return (
    <div
      onClick={handleClick}
      style={{ minWidth: '343px', flexShrink: 0, cursor: 'pointer' }}
    >
      <ContentContainer
        title="Trainee Grading"
        padding="16px 0"
        style={{ height: '466px' }}
      >
        <S.TraineeListContainer>
          <TraineeList trainees={sortedTrainees} />
        </S.TraineeListContainer>
      </ContentContainer>
    </div>
  );
};

export default TraineeGradingSection;
