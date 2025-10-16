import React, { useCallback, useEffect, useState } from 'react';
import { VStack, Text } from '@fillmore/ui';
import S from '../styles';
import { useTrainee } from '@/hooks/useTrainee';
import type { UserAchievement } from '@fillmore/db/types/common';

interface AchievementsSectionProps {
  userId: string;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  userId,
}) => {
  const { fetchAchievementsById } = useTrainee();
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);

  const fetchAchievements = useCallback(async () => {
    try {
      const fetchedAchievements = await fetchAchievementsById(userId);
      setAchievements(fetchedAchievements);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
      setAchievements([]);
    }
  }, [fetchAchievementsById, userId]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return (
    <VStack gap={8} align="end">
      <Text as="b" size={12} weight="bold">
        UNLOCKED ACHIEVEMENTS:
      </Text>
      <S.AchievementsGrid>
        {achievements.map((achievement: UserAchievement) => {
          return (
            <img
              key={achievement.id}
              src={achievement.iconUrl}
              alt={achievement.name ?? `Achievement ${achievement.id}`}
              style={{
                width: '32px',
                height: '32px',
                opacity: achievement.isAchieved ? 1 : 0.2,
                filter: achievement.isAchieved ? 'none' : 'grayscale(100%)',
              }}
            />
          );
        })}
      </S.AchievementsGrid>
    </VStack>
  );
};

export default AchievementsSection;
