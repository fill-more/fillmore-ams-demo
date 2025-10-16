import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VStack, Text } from '@fillmore/ui';
import S from './styles';
import { PATHNAME } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import ParticlesOverlay from '@/components/ParticlesOverlay';

const INITIAL_SECONDS = 3;

function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const iv = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      navigate(isAuthenticated ? PATHNAME.MAIN : PATHNAME.LOGIN, {
        replace: true,
      });
    }
  }, [seconds, isAuthenticated, navigate]);

  return (
    <S.Container>
      <ParticlesOverlay />
      <S.Card>
        <VStack align="center" gap={16}>
          <Text as="h1" size={42} weight="bold" color="var(--white)">
            404
          </Text>
          <Text as="span" size={16} color="var(--white)">
            The page you’re looking for doesn’t exist.
          </Text>
          <Text as="span" size={14} color="var(--white)">
            Redirecting in {seconds}s
          </Text>
        </VStack>
      </S.Card>
    </S.Container>
  );
}

export default NotFoundPage;
