import type { TaskStage } from '@fillmore/db/types/common';

export type StageDropdownOption = Pick<TaskStage, 'label'> & {
  value: string; // stageCode를 value로 사용
};

export type StageData = {
  dropdownOptions: StageDropdownOption[];
  stageCoordinates: TaskStageCoordinate[];
};

export interface TaskStageCoordinate {
  id: number;
  label: string;
  percentLeft: number;
  percentTop: number;
  isCompleted?: boolean;
}
