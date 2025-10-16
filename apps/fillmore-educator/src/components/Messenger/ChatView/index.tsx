import { useEffect } from 'react';
import { VStack, Divider } from '@fillmore/ui';
import Header from './Header';
import MessagesList from './MessagesList';
import ChatInput from '../ChatInput';
import { useChatroomMessage } from '@/hooks/useChatroomMessage';
import { useAuth } from '@/hooks/useAuth';
import type { ChatRoom } from '@fillmore/db/types/common';
import type { Task } from '@/types/task.types';

interface ChatViewProps {
  chatroom: ChatRoom;
  onBack: () => void;
  onClose: () => void;
}

function ChatView({ chatroom, onBack, onClose }: ChatViewProps) {
  const { user } = useAuth();
  const {
    messages,
    loadMessages,
    sendUserMessage,
    setCurrentChatroom,
    isLoadingMessages,
  } = useChatroomMessage();

  // Load messages when component mounts
  useEffect(() => {
    setCurrentChatroom(chatroom.id);
    loadMessages(chatroom.id);

    return () => {
      setCurrentChatroom(null);
    };
  }, [chatroom.id, loadMessages, setCurrentChatroom]);

  const handleTaskAccepted = (task: Task) => {
    console.log('Task accepted:', task);
    // TODO: Implement task acceptance logic
  };

  const handleSendMessage = async (content: string) => {
    if (!user?.id) return;
    try {
      await sendUserMessage(chatroom.id, user.id, content);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <VStack gap={16}>
      <Header chatroom={chatroom} onBack={onBack} onClose={onClose} />

      <Divider />

      <MessagesList
        messages={messages}
        isLoadingMessages={isLoadingMessages}
        currentUserId={user?.id}
        chatroom={chatroom}
      />
      <Divider />

      <ChatInput
        onSendMessage={handleSendMessage}
        onTaskAccepted={handleTaskAccepted}
      />
    </VStack>
  );
}

export default ChatView;
