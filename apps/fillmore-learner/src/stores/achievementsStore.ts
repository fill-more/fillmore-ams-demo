import { create } from 'zustand';
import { fetchAchievementsByUserId } from '@fillmore/db/queries';
import type { UserAchievement } from '@fillmore/db/types/common';

interface AchievementsState {
  achievements: UserAchievement[];
  isLoading: boolean;
}

interface AchievementsActions {
  fetchAchievements: (userId: string) => Promise<void>;
  setAchievements: (achievements: UserAchievement[]) => void;
}

export const useAchievementsStore = create<
  AchievementsState & AchievementsActions
>((set) => ({
  achievements: [],
  isLoading: false,

  fetchAchievements: async (userId: string) => {
    try {
      set({ isLoading: true });
      const userAchievements = await fetchAchievementsByUserId(userId);
      set({ achievements: userAchievements, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
      set({ achievements: [], isLoading: false });
    }
  },

  setAchievements: (achievements: UserAchievement[]) => {
    set({ achievements });
  },
}));
