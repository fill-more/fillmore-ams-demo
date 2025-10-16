import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  CloseButton,
  VStack,
  HStack,
  IconButton,
  Button,
  Divider,
  Text,
} from '@fillmore/ui';
import { useChatroom } from '@/hooks/useChatroom';
import ChatroomItem from '../ChatroomItem';
import S from './styles';

import type { ChatRoom } from '@fillmore/db/types/common';

interface ContactListProps {
  messageType: 'messages' | 'announcements';
  onChatroomClick?: (chatroom: ChatRoom) => void;
  onMessageTypeChange?: (type: 'messages' | 'announcements') => void;
  onClose: () => void;
}

function ContactList({
  messageType,
  onChatroomClick,
  onMessageTypeChange,
  onClose,
}: ContactListProps) {
  const { chatrooms, isLoading } = useChatroom();

  // Filter chatrooms based on message type
  const filteredChatrooms = useMemo(() => {
    if (messageType === 'announcements') {
      return chatrooms.filter((chatroom) => chatroom.isAnnouncement);
    } else {
      return chatrooms.filter((chatroom) => !chatroom.isAnnouncement);
    }
  }, [chatrooms, messageType]);

  return (
    <VStack gap={16}>
      <HStack align="center" justify="space-between">
        <Text as="b" size={16} weight="bold">
          Messages
        </Text>
        <HStack gap={4}>
          <IconButton title="Menu">
            <FontAwesomeIcon size="lg" icon={faBars} />
          </IconButton>
          <IconButton title="New Message">
            <FontAwesomeIcon size="lg" icon={faEdit} />
          </IconButton>
          <CloseButton onClick={onClose} style={{ marginLeft: '4px' }} />
        </HStack>
      </HStack>

      <HStack gap={4}>
        <Button
          filled={messageType === 'messages'}
          size="small"
          onClick={() => onMessageTypeChange?.('messages')}
        >
          Messages
        </Button>
        <Button
          filled={messageType === 'announcements'}
          size="small"
          onClick={() => onMessageTypeChange?.('announcements')}
        >
          Announcements
        </Button>
      </HStack>

      <Divider />

      <S.ListContainer>
        <VStack gap={12}>
          {isLoading ? (
            <Text
              as="span"
              size={12}
              style={{
                textAlign: 'center',
                color: 'var(--gray)',
                padding: '32px 16px',
              }}
            >
              Loading...
            </Text>
          ) : (
            <>
              {filteredChatrooms.map((chatroom) => (
                <ChatroomItem
                  key={chatroom.id}
                  chatroom={chatroom}
                  onClick={onChatroomClick}
                />
              ))}
              {filteredChatrooms.length === 0 && (
                <Text
                  as="span"
                  size={12}
                  style={{
                    textAlign: 'center',
                    color: 'var(--gray)',
                    padding: '32px 16px',
                  }}
                >
                  {messageType === 'announcements'
                    ? 'No announcements'
                    : 'No messages'}
                </Text>
              )}
            </>
          )}
        </VStack>
      </S.ListContainer>
    </VStack>
  );
}

export default ContactList;
