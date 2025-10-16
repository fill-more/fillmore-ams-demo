import type { ReactNode } from 'react';
import { HStack, IconButton, Text } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCommentDots,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import ArrowLeft from '@/assets/arrow-left.svg';

import S from './styles';
import type { TaskType } from '@/types/task.types';

const themeLabel: Record<TaskType, string> = {
  training: 'Train',
  reading: 'Read',
  practice: 'Practice',
};

interface TaskHeaderProps {
  type: TaskType;
  centerRender?: ReactNode;
}

function TaskHeader({ type, centerRender }: TaskHeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <HStack
      align="center"
      justify="space-between"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <HStack align="center" gap={10}>
        <S.BackButton onClick={handleBackClick}>
          <S.BackIcon src={ArrowLeft} alt="Back" />
          <Text as="b" size={34} weight="bold" color="var(--white)">
            {themeLabel[type]}
          </Text>
        </S.BackButton>
      </HStack>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {centerRender}
      </div>

      <HStack align="center" gap={8}>
        <IconButton title="Messages">
          <FontAwesomeIcon
            size="lg"
            icon={faCommentDots}
            color="var(--white)"
          />
        </IconButton>
        <IconButton title="Notifications">
          <FontAwesomeIcon size="lg" icon={faBell} color="var(--white)" />
        </IconButton>
        <IconButton title="Settings">
          <FontAwesomeIcon size="lg" icon={faGear} color="var(--white)" />
        </IconButton>
      </HStack>
    </HStack>
  );
}

export default TaskHeader;
