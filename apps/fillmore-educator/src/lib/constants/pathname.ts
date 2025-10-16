export const PATHNAME = {
  ROOT: '/',
  LOGIN: '/',
  MAP: '/map',
  MAIN: '/main',
  TRAINEE_GRADING: '/trainee-grading',
  USER_DETAIL: '/user/:userId',
  CALENDAR: '/calendar',
} as const;

export type PathnameType = (typeof PATHNAME)[keyof typeof PATHNAME];
