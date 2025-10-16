import { useEffect } from 'react';
import { useChatroomStore } from '@/stores/chatroomStore';
import { useAuth } from '@/hooks/useAuth';

export const useChatroom = () => {
  const { user } = useAuth();
  const chatrooms = useChatroomStore((s) => s.chatrooms);
  const isLoading = useChatroomStore((s) => s.isLoading);
  const loadChatrooms = useChatroomStore((s) => s.loadChatrooms);

  useEffect(() => {
    if (user?.id && chatrooms.length === 0) {
      loadChatrooms(user.id);
    }
  }, [user?.id, chatrooms.length, loadChatrooms]);

  return {
    chatrooms,
    isLoading,
    loadChatrooms,
  };
};
