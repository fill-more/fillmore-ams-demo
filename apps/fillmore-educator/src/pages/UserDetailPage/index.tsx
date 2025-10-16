import React from 'react';
import { useParams } from 'react-router-dom';
import { HStack, VStack, Divider, Text } from '@fillmore/ui';
import { useTrainee } from '@/hooks/useTrainee';
import TasksSection from './components/TasksSection';
import StrengthsWeaknessesSection from './components/StrengthsWeaknessesSection';
import TrainingContentSuggestionsSection from './components/TrainingContentSuggestionsSection';
import UserDetailHeader from './components/UserDetailHeader';
import TraineeProgressSection from './components/TraineeProgressSection';
import LeaderboardRankSection from './components/LeaderboardRankSection';
import UserProfileSection from './components/UserProfileSection';
import AchievementsSection from './components/AchievementsSection';
import { currentTasks, pastTasks, futureTasks } from '@/datas/userDetailTasks';

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getTraineeById } = useTrainee();

  if (!userId) {
    return (
      <VStack align="center" justify="center" style={{ height: '100vh' }}>
        <Text as="h1" size={34} weight="bold">
          User ID is missing
        </Text>
      </VStack>
    );
  }

  const user = getTraineeById(userId);

  if (!user) {
    return (
      <VStack align="center" justify="center" style={{ height: '100vh' }}>
        <Text as="h1" size={34} weight="bold">
          User not found
        </Text>
      </VStack>
    );
  }

  return (
    <VStack
      gap={32}
      fullWidth={true}
      style={{ padding: '84px 40px', minHeight: '100vh' }}
    >
      <UserDetailHeader />

      <HStack gap={20} align="start" fullWidth={true}>
        <UserProfileSection user={user} />
        <AchievementsSection userId={user.id} />
      </HStack>

      <Divider />

      <VStack gap={32} style={{ padding: '12px' }}>
        <HStack gap={12} fullWidth={true} align="stretch">
          <TraineeProgressSection userId={userId || '0'} />
          <LeaderboardRankSection currentUserId={userId || '0'} />
        </HStack>
        <TasksSection
          currentTasks={currentTasks}
          allTasks={[...currentTasks, ...futureTasks, ...pastTasks]}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px',
          }}
        >
          <StrengthsWeaknessesSection />
          <div />
          <TrainingContentSuggestionsSection />
        </div>
      </VStack>
    </VStack>
  );
};

export default UserDetailPage;
