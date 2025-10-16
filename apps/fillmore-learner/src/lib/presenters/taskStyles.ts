import type { TaskType } from '@/types/task.types';

/**
 * Returns gradient colors based on TaskType.
 * Returns a pair of colors for use inside a linear-gradient() function.
 *
 * @param type - Task Type ('training' | 'reading' | 'practice')
 * @returns A string of two comma-separated color values
 *
 * @example
 * // Usage example:
 * background: linear-gradient(to right, ${getTaskColors('training')});
 * background: linear-gradient(to bottom, ${getTaskColors('reading')});
 */
export const getTaskColors = (type: TaskType): string => {
  switch (type) {
    case 'training':
      return 'var(--training-start), var(--training-end)';
    case 'reading':
      return 'var(--reading-start), var(--reading-end)';
    case 'practice':
      return 'var(--practice-start), var(--practice-end)';
    default:
      return 'var(--training-start), var(--training-end)';
  }
};
