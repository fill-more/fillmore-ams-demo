export const PATHNAME = {
  ROOT: '/',
  LOGIN: '/',
  MAIN: '/main',
  CALENDAR: '/calendar',
  TRAINING: '/training',
  READING: '/reading',
  PRACTICE: '/practice',
} as const;

export type PathnameType = (typeof PATHNAME)[keyof typeof PATHNAME];
