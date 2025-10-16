export type TaskType = 'training' | 'reading' | 'practice';

export type TaskProgress = Record<TaskType, number>;

export interface Task {
  title: string;
  content: string;
  type: TaskType;
  isCompleted?: boolean;
}
