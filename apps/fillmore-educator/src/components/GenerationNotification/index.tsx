import { AnimatePresence } from 'framer-motion';
import { HStack, Text, VStack } from '@fillmore/ui';
import ColoredLogo from '@/assets/logo-mark/colored.svg';
import { useGenerationProgress } from '@/hooks/useGenerationProgress';
import { useEffect, useState } from 'react';
import S from './styles';

interface GenerationNotificationProps {
  onOpenModal: () => void;
}

function GenerationNotification({ onOpenModal }: GenerationNotificationProps) {
  const { progress, status, timeRemaining, stopGeneration } =
    useGenerationProgress();

  // Animated dots for processing state
  const [dots, setDots] = useState('.');

  useEffect(() => {
    if (status === 'pending') {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots('.');
    }
  }, [status]);

  useEffect(() => {
    if (status === 'error') {
      const timeout = setTimeout(() => {
        stopGeneration();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status, stopGeneration]);

  const handleNotificationClick = () => {
    if (status === 'completed') {
      // Open result modal and stop generation notification
      onOpenModal();
      stopGeneration();
    }
  };

  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <S.NotificationContainer
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={handleNotificationClick}
          isClickable={status === 'completed'}
        >
          <HStack style={{ padding: '8px 12px 8px 8px' }}>
            <S.LogoContainer isCompleted={status === 'completed'}>
              <S.Logo
                src={ColoredLogo}
                alt="Fillmore Logo"
                isCompleted={status === 'completed'}
              />
            </S.LogoContainer>

            <VStack gap={4} fullWidth={true}>
              <HStack justify="space-between">
                <Text as="b" size={12} weight="bold" color="var(--white)">
                  {status === 'pending'
                    ? `Processing${dots}`
                    : status === 'streaming'
                      ? 'Generating...'
                      : status === 'error'
                        ? 'Error'
                        : 'Completed!'}
                </Text>
                {(status === 'pending' ||
                  status === 'streaming' ||
                  status === 'completed') && (
                  <HStack gap={4}>
                    <Text as="b" size={12} weight="bold" color="var(--white)">
                      {Math.floor(progress)}%
                    </Text>
                    {timeRemaining && (
                      <Text as="b" size={12} weight="bold" color="var(--white)">
                        {timeRemaining}
                      </Text>
                    )}
                  </HStack>
                )}
              </HStack>

              <S.ProgressContainer>
                <S.ProgressBar progress={progress} />
              </S.ProgressContainer>
            </VStack>
          </HStack>
        </S.NotificationContainer>
      )}
    </AnimatePresence>
  );
}

export default GenerationNotification;
