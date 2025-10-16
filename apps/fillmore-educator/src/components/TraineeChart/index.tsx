import React, { useMemo } from 'react';

import { Chart, Popover, Text } from '@fillmore/ui';

import { useTrainee } from '@/hooks/useTrainee';
import type { Trainee } from '@/types/trainee.types';
import { getTeamAverageProgress } from '@/lib/services/traineeService';
import TraineeProgressItem from './TraineeProgressItem';

import backgroundGraph from './background-graph.svg';
import S from './styles';

const TeamAverageIndicator = () => {
  const { trainees } = useTrainee();
  const teamAverage = getTeamAverageProgress(trainees);
  return (
    <S.TeamAverageIndicator position={teamAverage}>
      <Popover isOpen={true} position="top" backgroundColor="var(--black)">
        <Text as="b" size={12} weight="bold" color="var(--white)">
          Team Avg.
        </Text>
      </Popover>
      <S.TeamAverageLine>
        <S.TeamAverageDot />
      </S.TeamAverageLine>
    </S.TeamAverageIndicator>
  );
};

interface TraineeChartProps {
  trainees?: Trainee[];
}

const TraineeChart: React.FC<TraineeChartProps> = ({
  trainees: propTrainees,
}) => {
  const { trainees: hookTrainees } = useTrainee();
  const trainees = propTrainees || hookTrainees;

  const isSingleTrainee = trainees.length === 1;

  const { topPerformer, worstPerformer } = useMemo(() => {
    if (!trainees || trainees.length <= 1) {
      return { topPerformer: null, worstPerformer: null };
    }
    const sortedUser = [...trainees].sort(
      (a, b) => a.overallPercentage - b.overallPercentage
    );
    return {
      worstPerformer: sortedUser[0],
      topPerformer: sortedUser[sortedUser.length - 1],
    };
  }, [trainees]);
  return (
    <Chart
      xLabel="% COMPLETED"
      yLabel="TASKS"
      maxValue={100}
      gridXLines={5}
      gridYLines={10}
      backgroundGraphSrc={backgroundGraph}
    >
      <S.TraineeContainer>
        {isSingleTrainee && <TeamAverageIndicator />}
        {trainees.map((trainee) => (
          <TraineeProgressItem
            key={trainee.id}
            user={trainee}
            displayMode={isSingleTrainee ? 'featured' : undefined}
            isTopPerformer={trainee.id === topPerformer?.id}
            isWorstPerformer={trainee.id === worstPerformer?.id}
          />
        ))}
      </S.TraineeContainer>
    </Chart>
  );
};

export default TraineeChart;
