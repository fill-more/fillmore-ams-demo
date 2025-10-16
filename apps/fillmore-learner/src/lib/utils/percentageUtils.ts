export const calculatePercentage = (current: number, max: number): number => {
  return Math.max(0, Math.min(100, (current / max) * 100));
};
