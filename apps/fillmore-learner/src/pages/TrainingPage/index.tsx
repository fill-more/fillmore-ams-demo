import { useState, useEffect } from 'react';
import { Text, Background, Dropdown, HStack, VStack } from '@fillmore/ui';
import S from './styles';

import TaskHeader from './components/TaskHeader';
import TaskNav from '@/components/TaskNav';
import TaskStagePopovers, {
  type TaskStageCoordinate,
} from '@/components/TaskStagePopovers';
import NextStageModal from '@/components/NextStageModal';
import { useStageStore } from '@/stores/stageStore';
import type { StageDropdownOption } from '@/types/stage.types';
import type { TaskType } from '@/types/task.types';

import bgTraining from '@/assets/background-training.png';

function TrainingPage() {
  const TASK_TYPE: TaskType = 'training';
  const { trainingStage, isLoading, loadTrainingStage } = useStageStore();
  const { dropdownOptions, stageCoordinates } = trainingStage;

  const [selectedStage, setSelectedStage] =
    useState<StageDropdownOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [roundTitle, setRoundTitle] = useState<string>('');
  const nextStageProgress = {
    total: 10,
    index: 2,
  };

  useEffect(() => {
    loadTrainingStage();
  }, [loadTrainingStage]);

  useEffect(() => {
    if (dropdownOptions.length > 0 && !selectedStage) {
      setSelectedStage(dropdownOptions[0]);
    }
  }, [dropdownOptions, selectedStage]);

  const handleStageClick = (coordinate: TaskStageCoordinate) => {
    setRoundTitle(coordinate.label);
    setIsModalOpen(true);
  };

  const handleCloseNextStageModal = () => {
    setIsModalOpen(false);
  };

  const handleDropdownChange = (optionValue: string) => {
    const found = dropdownOptions.find((opt) => opt.value === optionValue);
    if (found) setSelectedStage(found);
  };

  if (isLoading || !selectedStage) {
    return (
      <VStack
        gap={36}
        fullWidth
        align="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Text as="span" size={16} color="var(--white)">
          Loading...
        </Text>
      </VStack>
    );
  }

  return (
    <VStack
      gap={36}
      fullWidth
      style={{ position: 'relative', padding: '84px 40px', minHeight: '100vh' }}
    >
      <Background src={bgTraining} zIndex={-1} style={{ objectFit: 'fill' }} />
      <TaskStagePopovers
        coordinates={stageCoordinates}
        onStageClick={handleStageClick}
      />

      <TaskHeader
        type={TASK_TYPE}
        centerRender={
          <HStack justify="center" style={{ width: 420 }}>
            <Dropdown
              options={dropdownOptions}
              value={selectedStage.value}
              onChange={handleDropdownChange}
              buttonVariant="dark"
              buttonFilled={false}
              size="medium"
            />
          </HStack>
        }
      />

      <HStack style={{ position: 'relative' }}>
        <TaskNav activeType={TASK_TYPE} />

        <S.CenterContent>
          <S.MissionBadge $type={TASK_TYPE}>
            <Text as="b" size={12} color="var(--white)" weight="bold">
              MISSION OBJECTIVE
            </Text>
          </S.MissionBadge>
          <Text as="span" size={14} color="var(--white)">
            Complete your Training section of the course. Learn about the 6
            widely-used cyber attacks and help your team effectively implement
            countermeasures against China
          </Text>
        </S.CenterContent>
      </HStack>

      <NextStageModal
        isOpen={isModalOpen}
        onClose={handleCloseNextStageModal}
        roundTitle={roundTitle}
        stageTitle={selectedStage.label}
        taskType={TASK_TYPE}
        progress={nextStageProgress}
      />
    </VStack>
  );
}

export default TrainingPage;
