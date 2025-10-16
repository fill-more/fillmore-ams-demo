import { create } from 'zustand';
import {
  fetchMessagesByChatroomId,
  sendUserMessage,
} from '@fillmore/db/queries';
import type { Message } from '@fillmore/db/types/common';

interface MessageState {
  messages: Message[];
  currentChatroomId: string | null;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
}

interface MessageActions {
  loadMessages: (chatroomId: string) => Promise<void>;
  sendUserMessage: (
    chatroomId: string,
    senderId: string,
    content: string
  ) => Promise<void>;
  setCurrentChatroom: (chatroomId: string | null) => void;
}

export const useMessageStore = create<MessageState & MessageActions>((set) => ({
  messages: [],
  currentChatroomId: null,
  isLoadingMessages: false,
  isSendingMessage: false,

  loadMessages: async (chatroomId: string) => {
    try {
      set({ isLoadingMessages: true, currentChatroomId: chatroomId });
      const messages = await fetchMessagesByChatroomId(chatroomId);
      set({ messages, isLoadingMessages: false });
    } catch (error) {
      console.error('Failed to load messages:', error);
      set({ messages: [], isLoadingMessages: false });
    }
  },

  sendUserMessage: async (
    chatroomId: string,
    senderId: string,
    content: string
  ) => {
    try {
      set({ isSendingMessage: true });
      const sentMessage = await sendUserMessage(chatroomId, senderId, content);

      // Add the new message to existing messages
      set((state) => ({
        messages: [...state.messages, sentMessage],
        isSendingMessage: false,
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      set({ isSendingMessage: false });
      throw error;
    }
  },

  setCurrentChatroom: (chatroomId: string | null) => {
    set({ currentChatroomId: chatroomId });
    if (!chatroomId) {
      set({ messages: [] });
    }
  },
}));
