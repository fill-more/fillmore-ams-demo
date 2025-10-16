import { VStack, Text, HStack } from '@fillmore/ui';
import S from './styles';
import AchievementBadge from '@/components/Achievement';
import { useAchievements } from '@/hooks/useAchievements';
import { calculatePercentage } from '@/lib/utils/percentageUtils';

function AchievementsCard() {
  const { achievements } = useAchievements();

  const unlockedCount = achievements.filter((a) => a.isAchieved).length;
  const total = achievements.length;

  return (
    <VStack gap={12}>
      <HStack align="center" justify="space-between">
        <Text as="b" size={14} weight="bold" color="var(--white)">
          Achievement Badges:
        </Text>
        <Text as="span" size={12} color="var(--white)">
          {Math.round(calculatePercentage(unlockedCount, total)) || 0}%
        </Text>
      </HStack>

      <S.Grid>
        {achievements.map((achievement) => {
          const userAchievement = achievements.find(
            (a) => a.id === achievement.id
          );
          const unlocked = userAchievement?.isAchieved || false;

          return (
            <AchievementBadge
              key={`a-${achievement.id}`}
              achievement={achievement}
              alt={achievement.name}
              locked={!unlocked}
            />
          );
        })}
      </S.Grid>
    </VStack>
  );
}

export default AchievementsCard;
