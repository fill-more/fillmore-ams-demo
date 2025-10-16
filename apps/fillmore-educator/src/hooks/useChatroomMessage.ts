import { useMessageStore } from '@/stores/messageStore';

export const useChatroomMessage = () => {
  const messages = useMessageStore((s) => s.messages);
  const currentChatroomId = useMessageStore((s) => s.currentChatroomId);
  const isLoadingMessages = useMessageStore((s) => s.isLoadingMessages);
  const isSendingMessage = useMessageStore((s) => s.isSendingMessage);
  const loadMessages = useMessageStore((s) => s.loadMessages);
  const sendUserMessage = useMessageStore((s) => s.sendUserMessage);
  const setCurrentChatroom = useMessageStore((s) => s.setCurrentChatroom);

  return {
    messages,
    currentChatroomId,
    isLoadingMessages,
    isSendingMessage,
    loadMessages,
    sendUserMessage,
    setCurrentChatroom,
  };
};
