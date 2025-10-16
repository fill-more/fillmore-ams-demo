import { useEffect, useRef } from 'react';
import { Text } from '@fillmore/ui';
import MessageBubble from '../../MessageBubble';
import type { Message, ChatRoom } from '@fillmore/db/types/common';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import S from './styles';

interface MessagesListProps {
  messages: Message[];
  isLoadingMessages: boolean;
  currentUserId?: string;
  chatroom: ChatRoom;
}

function MessagesList({
  messages,
  isLoadingMessages,
  currentUserId,
  chatroom,
}: MessagesListProps) {
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const { otherParticipant, isAnnouncement } = chatroom;

  const displayName = isAnnouncement
    ? 'System Announcement'
    : otherParticipant
      ? formatDisplayName(otherParticipant.firstName, otherParticipant.lastName)
      : 'Unknown User';
  const profileImage = isAnnouncement
    ? null
    : otherParticipant?.profileImageUrl;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    // Smoothly scroll to bottom; fallback to instant if unsupported
    requestAnimationFrame(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      } catch {
        el.scrollTop = el.scrollHeight;
      }
    });
  }, [messages.length]);

  return (
    <S.MessagesContainer ref={messagesRef}>
      {isLoadingMessages ? (
        <Text
          as="span"
          size={12}
          color="var(--gray)"
          style={{
            textAlign: 'center',
            padding: '32px 16px',
          }}
        >
          Loading messages...
        </Text>
      ) : (
        messages.map((message) => {
          // Check if message is from current user
          const isOwn = message.sender.id === currentUserId;
          return (
            <MessageBubble
              key={message.id}
              isOwn={isOwn}
              profileImage={isOwn ? undefined : profileImage}
              displayName={isOwn ? undefined : displayName}
            >
              <Text size={12}>{message.content}</Text>
            </MessageBubble>
          );
        })
      )}
    </S.MessagesContainer>
  );
}

export default MessagesList;
