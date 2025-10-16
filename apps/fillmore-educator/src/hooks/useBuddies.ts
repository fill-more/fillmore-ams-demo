import { useEffect } from 'react';
import { useTraineeStore } from '@/stores/traineeStore';

interface UseBuddiesParams {
  userId: string;
}

export const useBuddies = ({ userId }: UseBuddiesParams) => {
  const { buddyIds, fetchBuddyIds } = useTraineeStore();

  useEffect(() => {
    if (userId) {
      fetchBuddyIds(userId);
    }
  }, [userId, fetchBuddyIds]);

  return { buddyIds };
};
