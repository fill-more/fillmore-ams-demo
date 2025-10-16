import type { UserAchievement } from '@fillmore/db/types/common';
import S from './styles';
import { HStack, Popover, ProgressBar, Text, VStack } from '@fillmore/ui';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { calculatePercentage } from '@/lib/utils/percentageUtils';

interface AchievementBadgeProps {
  achievement: UserAchievement;
  alt: string;
  locked: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

function AchievementBadge({
  achievement,
  alt,
  locked,
  position = 'top',
}: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Popover
        isOpen={isHovered}
        position={position}
        backgroundColor="var(--black)"
      >
        <VStack gap={8} style={{ padding: '8px 4px' }}>
          <VStack gap={4}>
            <HStack align="center" justify="space-between" fullWidth>
              <Text as="b" color="var(--white)" size={14} weight="bold">
                {achievement.name}
              </Text>
              <HStack align="center" gap={8}>
                <Text as="b" color="var(--white)" size={10} weight="bold">
                  {achievement.progress}/{achievement.requiredCount}
                </Text>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="sm"
                  color={locked ? 'var(--white-20)' : 'var(--white)'}
                />
              </HStack>
            </HStack>
            <ProgressBar
              width={200}
              height={2}
              percentage={calculatePercentage(
                achievement.progress,
                achievement.requiredCount
              )}
            />
          </VStack>
          <Text as="span" color="var(--white)" size={12}>
            {achievement.description}
          </Text>
        </VStack>
      </Popover>
      <S.Badge src={achievement.iconUrl} alt={alt} locked={locked}></S.Badge>
    </div>
  );
}

export default AchievementBadge;
