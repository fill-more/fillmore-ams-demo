import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBars,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { CloseButton, HStack, VStack, IconButton, Text } from '@fillmore/ui';
import ProfileImage from '@/components/ProfileImage';
import type { ChatRoom } from '@fillmore/db/types/common';
import { formatDisplayName } from '@/lib/utils/nameUtils';

interface HeaderProps {
  chatroom: ChatRoom;
  onBack: () => void;
  onClose: () => void;
}

function Header({ chatroom, onBack, onClose }: HeaderProps) {
  const { otherParticipant, isAnnouncement } = chatroom;

  const displayName = isAnnouncement
    ? 'System Announcement'
    : otherParticipant
      ? formatDisplayName(otherParticipant.firstName, otherParticipant.lastName)
      : 'Unknown User';
  const profileImage = isAnnouncement
    ? null
    : otherParticipant?.profileImageUrl;

  return (
    <VStack>
      <HStack align="center" justify="space-between">
        <IconButton onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
        <HStack gap={4}>
          <IconButton>
            <FontAwesomeIcon size="lg" icon={faBars} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon size="lg" icon={faPhone} />
          </IconButton>
          <CloseButton onClick={onClose} style={{ marginLeft: '4px' }} />
        </HStack>
      </HStack>

      <VStack align="center" gap={8}>
        {profileImage && (
          <ProfileImage
            src={profileImage}
            alt={displayName}
            size={48}
            userId={otherParticipant?.id}
            clickable={true}
          />
        )}
        <Text as="b" size={16} weight="bold">
          {displayName}
        </Text>
      </VStack>
    </VStack>
  );
}

export default Header;
