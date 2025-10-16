import React from 'react';
import { Text, Button, VStack } from '@fillmore/ui';
import { useNavigate } from 'react-router-dom';
import type { TaskType } from '@/types/task.types';
import { PATHNAME } from '@/lib/constants';
import S from './styles';
import TaskCard from '@/components/TaskCard';

interface ProgressCardProps {
  type: TaskType;
  current: number;
  total: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  type,
  current,
  total,
}) => {
  const navigate = useNavigate();

  const taskPaths: Record<TaskType, string> = {
    training: PATHNAME.TRAINING,
    reading: PATHNAME.READING,
    practice: PATHNAME.PRACTICE,
  };

  const handleGoClick = () => {
    navigate(taskPaths[type]);
  };
  // Circle configuration - easily adjustable
  const CIRCLE_RADIUS = 100;
  const STROKE_WIDTH = 16;
  const SVG_SIZE = 240;
  const CENTER = SVG_SIZE / 2;

  const percentage = Math.min(100, Math.round((current / total) * 100));
  const circumference = 2 * Math.PI * CIRCLE_RADIUS;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getTypeConfig = (taskType: TaskType) => {
    switch (taskType) {
      case 'training':
        return {
          label: 'Train',
          color: 'var(--primary-purple)',
          gradientId: 'training-gradient',
        };
      case 'reading':
        return {
          label: 'Read',
          color: 'var(--primary-yellow)',
          gradientId: 'reading-gradient',
        };
      case 'practice':
        return {
          label: 'Practice',
          color: 'var(--primary-green)',
          gradientId: 'practice-gradient',
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <S.Container>
      <VStack align="center" gap={32}>
        <S.CircularProgress>
          <svg width={SVG_SIZE} height={SVG_SIZE}>
            <defs>
              <filter id={`${config.gradientId}-blur`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
              </filter>
              <linearGradient
                id={config.gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {type === 'training' && (
                  <>
                    <stop offset="0%" stopColor="var(--training-start)" />
                    <stop offset="100%" stopColor="var(--training-end)" />
                  </>
                )}
                {type === 'reading' && (
                  <>
                    <stop offset="0%" stopColor="var(--reading-start)" />
                    <stop offset="100%" stopColor="var(--reading-end)" />
                  </>
                )}
                {type === 'practice' && (
                  <>
                    <stop offset="0%" stopColor="var(--practice-start)" />
                    <stop offset="100%" stopColor="var(--practice-end)" />
                  </>
                )}
              </linearGradient>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="rgba(0, 0, 0, 0.8)"
              strokeWidth={STROKE_WIDTH}
            />
            {/* Blur shadow layer */}
            <S.ProgressCircle
              cx={CENTER}
              cy={CENTER}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke={`url(#${config.gradientId})`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="butt"
              strokeDasharray={circumference}
              finalOffset={strokeDashoffset}
              circumference={circumference}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
              filter={`url(#${config.gradientId}-blur)`}
              opacity="0.7"
            />
            {/* Main progress circle */}
            <S.ProgressCircle
              cx={CENTER}
              cy={CENTER}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke={`url(#${config.gradientId})`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="butt"
              strokeDasharray={circumference}
              finalOffset={strokeDashoffset}
              circumference={circumference}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          </svg>
          <VStack align="center" style={{ position: 'absolute' }}>
            <Text as="b" size={34} weight="bold" color="var(--white)">
              {percentage}%
            </Text>
            <Text as="b" size={14} weight="bold" color="var(--white)">
              {config.label}
            </Text>
            <Text size={14} color="var(--white)">
              <b>{current}</b> / {total}
            </Text>
          </VStack>
        </S.CircularProgress>
        <Button variant="dark" onClick={handleGoClick}>
          Go
        </Button>
      </VStack>
      <VStack gap={4} fullWidth>
        <Text as="b" size={14} weight="bold" color="var(--white)">
          Next:
        </Text>
        <TaskCard
          title="Stage 1: Cyber Attack Basics"
          content="04: Brute Force Attack"
          type={type}
        />
      </VStack>
    </S.Container>
  );
};

export default ProgressCard;
