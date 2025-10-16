import { useCallback, useEffect } from 'react';
import { useAchievementsStore } from '@/stores/achievementsStore';
import { useAuth } from '@/hooks/useAuth';

export const useAchievements = () => {
  const achievements = useAchievementsStore((s) => s.achievements);
  const isLoading = useAchievementsStore((s) => s.isLoading);
  const fetchAchievementsAction = useAchievementsStore(
    (s) => s.fetchAchievements
  );
  const { user } = useAuth();

  const fetchAchievements = useCallback(
    (userId?: string) => {
      const targetUserId = userId || user?.id;
      if (targetUserId) {
        return fetchAchievementsAction(targetUserId);
      }
    },
    [fetchAchievementsAction, user?.id]
  );

  useEffect(() => {
    if (user?.id) {
      fetchAchievements();
    }
  }, [user?.id, fetchAchievements]);

  return {
    achievements,
    isLoading,
    fetchAchievements,
  };
};
