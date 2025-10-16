import React from 'react';
import { HStack, VStack, IconButton, Text } from '@fillmore/ui';
import TaskCard from '@/components/TaskCard';
import ProfileImage from '@/components/ProfileImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faPhone,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/hooks/useModal';
import Messenger from '@/components/Messenger';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import type { Trainee } from '@/types/trainee.types';
import type { TaskType } from '@/types/task.types';
import S from '../styles';

interface LearnerGradingItemProps {
  learner: Trainee;
  rank: number;
  highlightedTaskType?: TaskType;
}

const LearnerGradingItem: React.FC<LearnerGradingItemProps> = ({
  learner,
  rank,
  highlightedTaskType,
}) => {
  const messengerModal = useModal();

  const TASK_TYPES: TaskType[] = ['training', 'reading', 'practice'];
  // Sample recommended tasks based on learner's progress
  const getRecommendedTasks = () => {
    const tasks = [
      {
        title: 'Configure a firewall',
        content:
          'A firewall is a security device that monitors and controls incoming and outgoing network traffic.',
        type: 'practice' as const,
      },
      {
        title: 'Network Security Assessment',
        content:
          'Conduct comprehensive security assessment of network infrastructure and identify vulnerabilities.',
        type: 'training' as const,
      },
      {
        title: 'Cyber Threat Analysis',
        content:
          'Review current threat landscape and analyze potential attack vectors in your environment.',
        type: 'reading' as const,
      },
      {
        title: 'Incident Response Plan',
        content:
          'Develop and test incident response procedures for various types of cyber attacks.',
        type: 'practice' as const,
      },
    ];

    // Show 2-4 tasks based on rank (higher rank gets fewer recommendations)
    const numTasks = Math.max(2, 5 - rank);
    return tasks.slice(0, numTasks);
  };

  return (
    <VStack
      gap={12}
      fullWidth
      style={{
        marginBottom: '40px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--gray-light)',
      }}
    >
      <HStack align="center" justify="space-between">
        <HStack gap={8} align="center">
          <Text as="b" size={12} weight="bold">
            {rank}
          </Text>
          <ProfileImage
            src={learner.profileImageUrl}
            size={32}
            userId={learner.id}
            clickable={true}
          />
          <Text as="b" size={12} weight="bold">
            {learner.rank}{' '}
            {formatDisplayName(learner.firstName, learner.lastName)}
          </Text>
        </HStack>
        <HStack gap={4}>
          <div style={{ position: 'relative' }}>
            <IconButton title="Messages" onClick={messengerModal.toggle}>
              <FontAwesomeIcon icon={faCommentDots} size="lg" />
            </IconButton>
            <Messenger
              isOpen={messengerModal.isOpen}
              onClose={messengerModal.close}
            />
          </div>
          <IconButton title="Call">
            <FontAwesomeIcon icon={faPhone} size="lg" />
          </IconButton>
          <IconButton title="Menu">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </IconButton>
        </HStack>
      </HStack>

      <HStack
        gap={8}
        align="center"
        justify="space-between"
        style={{ marginBottom: '24px' }}
      >
        <S.ProgressBarContainer>
          {TASK_TYPES.map((taskType: TaskType) => (
            <S.ProgressSegment
              key={taskType}
              width={learner.taskProgress[taskType]}
              type={taskType}
              dimmed={highlightedTaskType && highlightedTaskType !== taskType}
            >
              <S.ProgressLabel highlighted={highlightedTaskType === taskType}>
                <Text as="b" size={10} weight="bold">
                  {learner.taskProgress[taskType]}%
                </Text>
              </S.ProgressLabel>
            </S.ProgressSegment>
          ))}
        </S.ProgressBarContainer>

        <Text as="b" size={22} weight="bold">
          {learner.overallPercentage}%
        </Text>
      </HStack>

      <VStack gap={8} align="start" fullWidth>
        <Text as="b" size={12} weight="bold">
          RECOMMENDED TASKS:
        </Text>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            width: '100%',
          }}
        >
          {getRecommendedTasks().map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              content={task.content}
              type={task.type}
              isCompleted={false}
            />
          ))}
        </div>
      </VStack>
    </VStack>
  );
};

export default LearnerGradingItem;
