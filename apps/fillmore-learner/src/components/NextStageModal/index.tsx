import type { JSX } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { TaskType } from '@/types/task.types';

import S from './styles';
import TrainingContent from './contents/TrainingContent';
import ReadingContent from './contents/ReadingContent';
import PracticeContent from './contents/PracticeContent';
import Header from './Header';

interface NextStageModalProps {
  isOpen: boolean;
  roundTitle: string;
  stageTitle: string;
  taskType: TaskType;
  progress: {
    total: number;
    index: number;
  };
  onClose: () => void;
}

function NextStageModal({
  isOpen,
  roundTitle,
  stageTitle,
  taskType,
  progress,
  onClose,
}: NextStageModalProps) {
  const handleSubmit = () => {
    onClose();
  };

  const renderContent: () => JSX.Element = () => {
    switch (taskType as TaskType) {
      case 'training':
        return <TrainingContent onSubmit={handleSubmit} />;
      case 'reading':
        return <ReadingContent onSubmit={handleSubmit} />;
      case 'practice':
      default:
        return <PracticeContent onSubmit={handleSubmit} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.MotionOverlay
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <S.MotionContent>
            <Header
              roundTitle={roundTitle}
              stageTitle={stageTitle}
              taskType={taskType}
              progress={progress}
              onClose={onClose}
            />

            <S.Content>{renderContent()}</S.Content>
          </S.MotionContent>
        </S.MotionOverlay>
      )}
    </AnimatePresence>
  );
}

export default NextStageModal;
