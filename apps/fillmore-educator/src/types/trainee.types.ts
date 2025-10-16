import type { TaskProgress } from './task.types';
import type { UserProfile } from '@fillmore/db/types/common';
export interface Trainee extends UserProfile {
  taskProgress: TaskProgress;
  overallPercentage: number;
}
