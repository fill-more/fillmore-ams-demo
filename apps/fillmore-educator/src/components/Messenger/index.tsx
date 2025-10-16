import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ContactList from './ContactList';
import ChatView from './ChatView';
import type { ChatRoom } from '@fillmore/db/types/common';
import S from './styles';

interface MessengerProps {
  isOpen: boolean;
  onClose: () => void;
}

type MessageType = 'messages' | 'announcements';

function Messenger({ isOpen, onClose }: MessengerProps) {
  const [activeMessageType, setActiveMessageType] =
    useState<MessageType>('messages');
  const [showChat, setShowChat] = useState<boolean>(false);
  const [selectedChatroom, setSelectedChatroom] = useState<ChatRoom | null>(
    null
  );

  const handleToggle = (type: MessageType) => {
    setActiveMessageType(type);
  };

  const handleChatroomClick = (chatroom: ChatRoom) => {
    setShowChat(true);
    setSelectedChatroom(chatroom);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedChatroom(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Container
          initial={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {showChat && selectedChatroom ? (
            <ChatView
              chatroom={selectedChatroom}
              onBack={handleBackToList}
              onClose={onClose}
            />
          ) : (
            <ContactList
              messageType={activeMessageType}
              onChatroomClick={handleChatroomClick}
              onMessageTypeChange={handleToggle}
              onClose={onClose}
            />
          )}
        </S.Container>
      )}
    </AnimatePresence>
  );
}

export default Messenger;
