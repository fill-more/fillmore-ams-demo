import { create } from 'zustand';
import { login, fetchCurrentUser } from '@fillmore/db/queries';
import { getSupabaseClient } from '@fillmore/db/supabaseClient';
import type { UserProfile } from '@fillmore/db/types/common';

interface AuthState {
  isLoading: boolean;
  user: UserProfile | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadCurrentUser: () => Promise<void>;
  setAuthState: (state: AuthState) => void;
}

const supabase = getSupabaseClient();

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isLoading: true,
  user: null as UserProfile | null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const authData = await login(email, password, 'educator');

      if (authData.user) {
        const userProfile = await fetchCurrentUser();
        set({
          isLoading: false,
          user: userProfile,
        });
      }
    } catch (error) {
      set({ isLoading: false, user: null });
      throw error;
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ isLoading: false, user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  loadCurrentUser: async () => {
    try {
      set({ isLoading: true });
      const userProfile = await fetchCurrentUser();

      set({
        isLoading: false,
        user: userProfile,
      });
    } catch (error) {
      console.error('Load current user error:', error);
      set({ isLoading: false, user: null });
    }
  },

  setAuthState: (state: AuthState) => {
    set(state);
  },
}));
