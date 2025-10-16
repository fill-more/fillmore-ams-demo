import { useEffect } from 'react';
import { useTraineeStore } from '@/stores/traineeStore';

export const useTrainee = () => {
  const { trainees, fetchTrainees, getTraineeById, fetchAchievementsById } =
    useTraineeStore();

  useEffect(() => {
    if (trainees.length === 0) {
      fetchTrainees();
    }
  }, [trainees.length, fetchTrainees]);

  return {
    trainees,
    getTraineeById,
    fetchTrainees,
    fetchAchievementsById,
  };
};
