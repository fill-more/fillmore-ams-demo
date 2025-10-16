import { create } from 'zustand';
import {
  fetchUserProfiles,
  fetchBuddyIdsByUserId,
  fetchAchievementsByUserId,
} from '@fillmore/db/queries';
import type { Trainee } from '@/types/trainee.types';
import { getProgressByIndex } from '@/datas/userProgress';
import type { UserProfile, UserAchievement } from '@fillmore/db/types/common';

interface TraineeState {
  trainees: Trainee[];
  buddyIds: string[];
}

interface TraineeActions {
  fetchTrainees: () => Promise<void>;
  getTraineeById: (id: string) => Trainee | undefined;
  fetchBuddyIds: (userId: string) => Promise<void>;
  fetchAchievementsById: (id: string) => Promise<UserAchievement[]>;
}

export const useTraineeStore = create<TraineeState & TraineeActions>(
  (set, get) => ({
    trainees: [],
    buddyIds: [],

    fetchTrainees: async () => {
      const profiles = await fetchUserProfiles();
      const trainees: Trainee[] = profiles
        .filter((profile) => profile.role === 'learner')
        .map((profile: UserProfile, index: number) => ({
          ...profile,
          taskProgress: getProgressByIndex(index)?.taskProgress || {
            training: 0,
            reading: 0,
            practice: 0,
          },
          overallPercentage: getProgressByIndex(index)?.overallPercentage || 0,
        }));
      set({ trainees });
    },

    getTraineeById: (id: string) => {
      const { trainees } = get();
      return trainees.find((trainee) => trainee.id === id);
    },

    fetchBuddyIds: async (userId: string) => {
      if (!userId) return;

      const buddyIds = await fetchBuddyIdsByUserId(userId);
      set({ buddyIds });
    },

    fetchAchievementsById: (id: string) => {
      return fetchAchievementsByUserId(id);
    },
  })
);
