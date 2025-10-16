export type UserRole = 'educator' | 'learner';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole | null;
  profileImageUrl: string | null;
  background: string | null;
  branch: string | null;
  rank: string | null;
  level: number;
  experiencePoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  id: number;
  name: string;
  description: string | null;
  iconUrl: string;
  requiredCount: number;
  progress: number;
  isAchieved: boolean;
}

export type TaskType = 'training' | 'reading' | 'practice';

export interface TaskStage {
  id: string;
  label: string;
  orderIndex: number;
  stageCode: string;
  taskType: TaskType;
}

export interface Task {
  id: string;
  label: string;
  description: string | null;
  orderIndex: number;
  percentLeft: number;
  percentTop: number;
  stageId: string;
}

export interface ChatRoomParticipant {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
}

export interface ChatRoomLastMessage {
  content: string;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  isAnnouncement: boolean;
  createdAt: string;
  otherParticipant: ChatRoomParticipant | null;
  lastMessage: ChatRoomLastMessage | null;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
  };
}

export interface Instruction {
  id: string;
  title: string;
  content: string;
  type: string;
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
