import { HStack, Text } from '@fillmore/ui';
import { formatRelativeTime } from '@/lib/formatters/timeFormat';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import ProfileImage from '@/components/ProfileImage';
import type { ChatRoom } from '@fillmore/db/types/common';
import S from './styles';

interface ChatroomItemProps {
  chatroom: ChatRoom;
  onClick?: (chatroom: ChatRoom) => void;
}

function ChatroomItem({ chatroom, onClick }: ChatroomItemProps) {
  const { lastMessage, otherParticipant, isAnnouncement } = chatroom;

  // Get display information
  const displayName = isAnnouncement
    ? 'System Announcement'
    : otherParticipant
      ? formatDisplayName(otherParticipant.firstName, otherParticipant.lastName)
      : 'Unknown User';
  const profileImage = isAnnouncement
    ? null
    : otherParticipant?.profileImageUrl;

  const formattedTime = lastMessage
    ? formatRelativeTime(new Date(lastMessage.createdAt))
    : '';

  const handleClick = () => {
    onClick?.(chatroom);
  };

  return (
    <HStack
      align="center"
      gap={8}
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      {profileImage ? (
        <ProfileImage
          src={profileImage}
          alt={displayName}
          size={32}
          userId={otherParticipant?.id}
          clickable={true}
        />
      ) : (
        <S.AnnouncementIcon>📢</S.AnnouncementIcon>
      )}

      <S.ContentContainer>
        <Text as="b" size={16} weight="bold">
          {displayName}
        </Text>
        <Text
          as="span"
          size={12}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '240px',
          }}
        >
          {lastMessage?.content || ''}
        </Text>
      </S.ContentContainer>
      <Text
        as="b"
        size={10}
        weight="bold"
        style={{ minWidth: '24px', textAlign: 'right' }}
      >
        {formattedTime}
      </Text>
    </HStack>
  );
}

export default ChatroomItem;
