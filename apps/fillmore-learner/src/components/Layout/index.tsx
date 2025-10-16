import type { ReactNode } from 'react';

import { Background } from '@fillmore/ui';

import UserHeader from '@/components/UserHeader';

import backgrounMain from '@/assets/background-main.png';
import S from './styles';
import ParticlesOverlay from '@/components/ParticlesOverlay';

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
  return (
    <S.Container>
      <Background src={backgrounMain} zIndex={-1} />
      <ParticlesOverlay />
      {showUserHeader && <UserHeader showDetails={showUserHeaderDetails} />}
      {children}
    </S.Container>
  );
}

export default Layout;
