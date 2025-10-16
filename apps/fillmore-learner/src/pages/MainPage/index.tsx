import { useEffect, useState } from 'react';
import { HStack, VStack, Text } from '@fillmore/ui';
import WelcomeHeader from './components/WelcomeHeader';
import ProgressCard from './components/ProgressCard';
import StreaksCard from './components/StreaksCard';
import AchievementsCard from './components/AchievementsCard';
import WelcomeOverlay from './components/WelcomeOverlay';
import { useAuth } from '@/hooks/useAuth';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import { SESSION_KEY_WELCOME_OVERLAY } from '@/lib/constants';

function MainPage() {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || typeof window === 'undefined') {
      setIsWelcomeOpen(false);
      return;
    }

    const hasSeen =
      sessionStorage.getItem(SESSION_KEY_WELCOME_OVERLAY) === 'true';
    setIsWelcomeOpen(!hasSeen);
  }, [isAuthenticated]);

  const handleCloseOverlay = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY_WELCOME_OVERLAY, 'true');
    }
    setIsWelcomeOpen(false);
  };

  return (
    <>
      <WelcomeOverlay
        isOpen={isWelcomeOpen}
        userName={
          user
            ? formatDisplayName(user.firstName, user.lastName)
            : 'Private Henderson'
        }
        onClose={handleCloseOverlay}
      />
      <VStack
        gap={42}
        fullWidth={true}
        style={{ padding: '72px 40px', minHeight: '100vh' }}
      >
        <WelcomeHeader />
        <VStack gap={48} fullWidth style={{ padding: '0 58px' }}>
          <VStack align="center" gap={8} fullWidth>
            <Text as="span" size={14} color="var(--white)">
              Current study period: <b>February 26th - March 3rd</b>
            </Text>
            <HStack justify="space-between" gap={16} fullWidth>
              <ProgressCard type="training" current={20} total={30} />
              <ProgressCard type="reading" current={12} total={10} />
              <ProgressCard type="practice" current={8} total={15} />
            </HStack>
          </VStack>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '32px',
            }}
          >
            <StreaksCard />
            <div />
            <AchievementsCard />
          </div>
        </VStack>
      </VStack>
    </>
  );
}

export default MainPage;
