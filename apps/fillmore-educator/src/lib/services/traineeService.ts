import type { Trainee } from '@/types/trainee.types';

export const getTeamAverageProgress = (trainees: Trainee[]): number => {
  if (trainees.length === 0) return 0;

  const totalProgress = trainees.reduce(
    (sum: number, trainee: Trainee) => sum + trainee.overallPercentage,
    0
  );

  return Math.round(totalProgress / trainees.length);
};
