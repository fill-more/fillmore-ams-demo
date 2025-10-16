import type { ReactNode } from 'react';

import { Background } from '@fillmore/ui';

import UserHeader from '@/components/UserHeader';
import GenerationNotification from '@/components/GenerationNotification';
import GeneratedContentModal from '@/components/GeneratedContentModal';
import QuickAIButton from '@/components/QuickAIButton';
import { useModal } from '@/hooks/useModal';

import backgroundSubtleLight from '@/assets/background-subtle-light.png';
import backgroundRadialDark from '@/assets/background-radial-dark.png';
import S from './styles';

interface LayoutProps {
  children: ReactNode;
  showUserHeader?: boolean;
  showUserHeaderDetails?: boolean;
}

function Layout({
  children,
  showUserHeader = true,
  showUserHeaderDetails = true,
}: LayoutProps) {
  const generatedContentModal = useModal();

  return (
    <S.Container>
      <Background src={backgroundSubtleLight} zIndex={-2} />
      <Background src={backgroundRadialDark} opacity={0.5} zIndex={-1} />
      {showUserHeader && <UserHeader showDetails={showUserHeaderDetails} />}
      {children}
      <GenerationNotification onOpenModal={generatedContentModal.open} />
      <GeneratedContentModal
        isOpen={generatedContentModal.isOpen}
        onClose={generatedContentModal.close}
      />
      <QuickAIButton />
    </S.Container>
  );
}

export default Layout;
