import type { Task } from '@/types/task.types';

interface BaseMessage {
  id: string;
  type: 'user' | 'system';
  content: string;
  createdAt: Date;
}

export interface UserMessage extends BaseMessage {
  type: 'user';
  senderId: string;
}

export interface SystemMessage extends BaseMessage {
  type: 'system';
  task: Task;
}

export type Message = UserMessage | SystemMessage;
