import { create } from 'zustand';
import { fetchChatRoomsByUserId } from '@fillmore/db/queries';
import type { ChatRoom } from '@fillmore/db/types/common';

interface ChatroomState {
  chatrooms: ChatRoom[];
  isLoading: boolean;
}

interface ChatroomActions {
  loadChatrooms: (userId: string) => Promise<void>;
}

export const useChatroomStore = create<ChatroomState & ChatroomActions>(
  (set) => ({
    chatrooms: [],
    isLoading: false,

    loadChatrooms: async (userId: string) => {
      try {
        set({ isLoading: true });
        const chatrooms = await fetchChatRoomsByUserId(userId);
        set({ chatrooms, isLoading: false });
      } catch (error) {
        console.error('Failed to load chatrooms:', error);
        set({ chatrooms: [], isLoading: false });
      }
    },
  })
);
