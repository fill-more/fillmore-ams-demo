import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './styles';
import { Button, VStack, TextField, Background, Text } from '@fillmore/ui';
import logoWhite from '@/assets/logo-full/white.svg';
import background from '@/assets/background-soldier.png';
import { PATHNAME, SESSION_KEY_WELCOME_OVERLAY } from '@/lib/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/useAuth';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHNAME.MAIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      setErrorMessage('');
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(SESSION_KEY_WELCOME_OVERLAY);
      }
      await login(userId, password);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <S.Container>
      <Background src={background} />
      <VStack gap={16}>
        <S.Logo src={logoWhite} alt="Fillmore Logo" />
        <S.LoginForm>
          <VStack gap={20} align="center" fullWidth>
            <VStack gap={8} fullWidth>
              <TextField
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onEnterPress={handleLogin}
                icon={<FontAwesomeIcon icon={faIdCard} size="sm" />}
                placeholder="User ID"
                wrapperStyle={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                }}
                style={{
                  color: 'var(--white)',
                }}
              />
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onEnterPress={handleLogin}
                icon={<FontAwesomeIcon icon={faUnlockKeyhole} size="sm" />}
                placeholder="Password"
                wrapperStyle={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                }}
                style={{
                  color: 'var(--white)',
                }}
              />
            </VStack>
            <Button
              variant="dark"
              size="small"
              filled={true}
              onClick={handleLogin}
            >
              Login
            </Button>
            {errorMessage && (
              <Text size={14} color="var(--red)">
                {errorMessage}
              </Text>
            )}
          </VStack>
          <span
            style={{
              color: 'var(--white)',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </span>
        </S.LoginForm>
      </VStack>
      <S.Copyright>©2024 Fillmore.Ai - All Rights Reserved.</S.Copyright>
    </S.Container>
  );
}

export default LoginPage;
