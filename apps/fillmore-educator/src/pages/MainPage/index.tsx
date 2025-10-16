import { HStack, VStack, Divider } from '@fillmore/ui';
import WelcomeHeader from './components/WelcomeHeader';
import TraineeGradingSection from './components/TraineeGradingSection';
import ProgressSection from './components/ProgressSection';
import TrainingScheduleSection from './components/TrainingScheduleSection';
import RecentNewsSection from './components/RecentNewsSection';
import TrainingContentSuggestionsSection from './components/TrainingContentSuggestionsSection';

function MainPage() {
  return (
    <VStack
      gap={32}
      fullWidth={true}
      style={{ padding: '72px 40px', minHeight: '100vh' }}
    >
      <WelcomeHeader />
      <Divider color="var(--dark-gray-10)" />
      <VStack gap={32} style={{ padding: '12px' }}>
        <HStack gap={12} fullWidth={true} align="stretch">
          <ProgressSection />
          <TraineeGradingSection />
        </HStack>
        <TrainingScheduleSection />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px',
          }}
        >
          <RecentNewsSection />
          <div />
          <TrainingContentSuggestionsSection />
        </div>
      </VStack>
    </VStack>
  );
}

export default MainPage;
