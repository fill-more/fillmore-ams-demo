import { type FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gradientBackground from '@/assets/fillmore-gradient.png';
import whiteLogo from '@/assets/logo-mark/white.svg';
import PriorityItem, { type PriorityItemData } from './PriorityItem';
import { welcomeOverlayPriorityItems } from '@/datas/welcomeOverlay';
import S from './styles';
import { Button, HStack, Text, VStack } from '@fillmore/ui';

interface WelcomeOverlayProps {
  isOpen: boolean;
  userName: string;
  onClose: () => void;
  items?: PriorityItemData[];
}

const WelcomeOverlay: FC<WelcomeOverlayProps> = ({
  isOpen,
  userName,
  onClose,
  items = welcomeOverlayPriorityItems,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isOpen || !isMounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <S.Overlay>
      <S.BackgroundLayer src={gradientBackground} alt="Fillmore gradient" />
      <VStack
        align="center"
        gap={32}
        fullWidth
        style={{ position: 'relative' }}
      >
        <HStack
          style={{ padding: '8px 16px', border: '1px solid var(--white)' }}
        >
          <Text as="b" size={22} color="var(--white)" weight="bold">
            {`Welcome ${userName}`}
          </Text>
        </HStack>
        <VStack
          align="center"
          gap={24}
          fullWidth
          style={{ position: 'relative' }}
        >
          <S.GradientVeil />
          <S.Divider />
          <VStack align="center" gap={24} style={{ zIndex: 1 }}>
            <Text as="b" size={16} color="var(--white)" weight="bold">
              Here are your priorities for today
            </Text>
            <VStack gap={12}>
              {items.map((item) => (
                <PriorityItem key={item.id} item={item} />
              ))}
            </VStack>
            <Button
              variant="dark"
              size="medium"
              filled={true}
              onClick={onClose}
              style={{ minWidth: '140px', margin: '48px 0' }}
            >
              OK
            </Button>
          </VStack>
          <S.Divider />
          <img
            src={whiteLogo}
            alt="Fillmore logo"
            width={64}
            height={64}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </VStack>
      </VStack>
    </S.Overlay>,
    document.body
  );
};

export default WelcomeOverlay;
