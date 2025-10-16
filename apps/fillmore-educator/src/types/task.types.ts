import type { TaskType } from '@fillmore/db/types/common';

export type TaskProgress = Record<TaskType, number>;

export interface Task {
  title: string;
  content: string;
  type: TaskType;
  isCompleted?: boolean;
}

export type { TaskType };
