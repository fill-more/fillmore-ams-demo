import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Background, Button, VStack, TextField, Text } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import S from './styles';
import { PATHNAME } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import logoBlack from '@/assets/logo-full/black.svg';
import backgroundRadialDark from '@/assets/background-radial-dark.png';

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
      await login(userId, password);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <S.Container>
      <S.BackgroundWrapper>
        <Background src={backgroundRadialDark} />
      </S.BackgroundWrapper>
      <VStack gap={16}>
        <S.Logo src={logoBlack} alt="Fillmore Logo" />
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
              />
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onEnterPress={handleLogin}
                icon={<FontAwesomeIcon icon={faUnlockKeyhole} size="sm" />}
                placeholder="Password"
              />
            </VStack>
            <Button
              variant="light"
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
              color: 'var(--black)',
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
