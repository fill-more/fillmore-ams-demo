import { Text, VStack } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import type { TaskType } from '@/types/task.types';
import { PATHNAME } from '@/lib/constants';
import S from './styles';

const themeLabel: Record<TaskType, string> = {
  training: 'Train',
  reading: 'Read',
  practice: 'Practice',
};

const taskPaths: Record<TaskType, string> = {
  training: PATHNAME.TRAINING,
  reading: PATHNAME.READING,
  practice: PATHNAME.PRACTICE,
};

interface TaskNavProps {
  activeType: TaskType;
}

function TaskNav({ activeType }: TaskNavProps) {
  const navigate = useNavigate();

  const handleClick = (taskType: TaskType) => {
    if (activeType === taskType) return;
    navigate(taskPaths[taskType]);
  };

  return (
    <S.LeftNav>
      <VStack gap={0}>
        {(['training', 'reading', 'practice'] as const).map(
          (taskType: TaskType) => (
            <S.NavItem
              key={taskType}
              active={taskType === activeType}
              onClick={() => handleClick(taskType)}
            >
              <Text as="b" size={14} color="inherit" weight="bold">
                {themeLabel[taskType]}
              </Text>
              <FontAwesomeIcon icon={faCaretRight} />
            </S.NavItem>
          )
        )}
      </VStack>
    </S.LeftNav>
  );
}

export default TaskNav;
