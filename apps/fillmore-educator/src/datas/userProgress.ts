import type { TaskProgress } from '@/types/task.types';

export interface UserProgress {
  taskProgress: TaskProgress;
  overallPercentage: number;
}

export const userProgressData: UserProgress[] = [
  {
    taskProgress: { training: 15, reading: 12, practice: 8 },
    overallPercentage: 35,
  },
  {
    taskProgress: { training: 18, reading: 14, practice: 9 },
    overallPercentage: 41,
  },
  {
    taskProgress: { training: 19, reading: 15, practice: 9 },
    overallPercentage: 43,
  },
  {
    taskProgress: { training: 20, reading: 15, practice: 10 },
    overallPercentage: 45,
  },
  {
    taskProgress: { training: 21, reading: 16, practice: 10 },
    overallPercentage: 47,
  },
  {
    taskProgress: { training: 22, reading: 17, practice: 11 },
    overallPercentage: 50,
  },
  {
    taskProgress: { training: 23, reading: 18, practice: 12 },
    overallPercentage: 53,
  },
  {
    taskProgress: { training: 26, reading: 20, practice: 14 },
    overallPercentage: 60,
  },
  {
    taskProgress: { training: 27, reading: 20, practice: 14 },
    overallPercentage: 61,
  },
  {
    taskProgress: { training: 28, reading: 21, practice: 15 },
    overallPercentage: 64,
  },
  {
    taskProgress: { training: 29, reading: 22, practice: 15 },
    overallPercentage: 66,
  },
  {
    taskProgress: { training: 30, reading: 22, practice: 15 },
    overallPercentage: 67,
  },
  {
    taskProgress: { training: 32, reading: 24, practice: 15 },
    overallPercentage: 71,
  },
  {
    taskProgress: { training: 33, reading: 25, practice: 15 },
    overallPercentage: 73,
  },
  {
    taskProgress: { training: 34, reading: 25, practice: 16 },
    overallPercentage: 75,
  },
  {
    taskProgress: { training: 35, reading: 25, practice: 16 },
    overallPercentage: 76,
  },
  {
    taskProgress: { training: 36, reading: 27, practice: 16 },
    overallPercentage: 79,
  },
  {
    taskProgress: { training: 38, reading: 28, practice: 18 },
    overallPercentage: 84,
  },
  {
    taskProgress: { training: 40, reading: 30, practice: 18 },
    overallPercentage: 88,
  },
  {
    taskProgress: { training: 42, reading: 32, practice: 19 },
    overallPercentage: 93,
  },
];

export const getProgressByIndex = (index: number): UserProgress | undefined => {
  return userProgressData[index];
};
