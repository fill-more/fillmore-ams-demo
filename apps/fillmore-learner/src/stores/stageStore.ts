import { create } from 'zustand';
import {
  fetchTaskStagesByTaskType,
  fetchTasksByStageId,
} from '@fillmore/db/queries';
import type { TaskStage, Task } from '@fillmore/db/types/common';
import type {
  StageDropdownOption,
  StageData,
  TaskStageCoordinate,
} from '@/types/stage.types';

interface StageDataState {
  trainingStage: StageData;
  readingStage: StageData;
  practiceStage: StageData;
  isLoading: boolean;
}

interface StageDataActions {
  fetchStageData: (taskType: string) => Promise<StageData>;
  loadTrainingStage: () => Promise<void>;
  loadReadingStage: () => Promise<void>;
  loadPracticeStage: () => Promise<void>;
}

const transformTaskStageToDropdownOption = (
  index: number,
  taskStage: TaskStage
): StageDropdownOption => ({
  value: taskStage.stageCode,
  label: `Stage ${index + 1}: ${taskStage.label}`,
});

const transformTaskToCoordinate = (
  task: Task,
  index: number
): TaskStageCoordinate => ({
  id: index + 1,
  label: `${String(index + 1).padStart(2, '0')}: ${task.label}`,
  percentLeft: task.percentLeft,
  percentTop: task.percentTop,
  isCompleted: false,
});

export const useStageStore = create<StageDataState & StageDataActions>(
  (set, get) => ({
    trainingStage: { dropdownOptions: [], stageCoordinates: [] },
    readingStage: { dropdownOptions: [], stageCoordinates: [] },
    practiceStage: { dropdownOptions: [], stageCoordinates: [] },
    isLoading: false,

    fetchStageData: async (taskType: string): Promise<StageData> => {
      try {
        const taskStages = await fetchTaskStagesByTaskType(taskType);

        if (taskStages.length === 0) {
          return { dropdownOptions: [], stageCoordinates: [] };
        }

        const dropdownOptions = taskStages.map((stage, index) =>
          transformTaskStageToDropdownOption(index, stage)
        );

        const firstStage = taskStages[0];
        const tasks = await fetchTasksByStageId(firstStage.id);
        const stageCoordinates = tasks.map(transformTaskToCoordinate);

        return { dropdownOptions, stageCoordinates };
      } catch (error) {
        console.error(`Failed to fetch stage data for ${taskType}:`, error);
        return { dropdownOptions: [], stageCoordinates: [] };
      }
    },

    loadTrainingStage: async () => {
      try {
        set({ isLoading: true });
        const trainingData = await get().fetchStageData('training');
        set({ trainingStage: trainingData, isLoading: false });
      } catch (error) {
        console.error('Failed to load training stage:', error);
        set({
          trainingStage: { dropdownOptions: [], stageCoordinates: [] },
          isLoading: false,
        });
      }
    },

    loadReadingStage: async () => {
      try {
        set({ isLoading: true });
        const readingData = await get().fetchStageData('reading');
        set({ readingStage: readingData, isLoading: false });
      } catch (error) {
        console.error('Failed to load reading stage:', error);
        set({
          readingStage: { dropdownOptions: [], stageCoordinates: [] },
          isLoading: false,
        });
      }
    },

    loadPracticeStage: async () => {
      try {
        set({ isLoading: true });
        const practiceData = await get().fetchStageData('practice');
        set({ practiceStage: practiceData, isLoading: false });
      } catch (error) {
        console.error('Failed to load practice stage:', error);
        set({
          practiceStage: { dropdownOptions: [], stageCoordinates: [] },
          isLoading: false,
        });
      }
    },
  })
);
