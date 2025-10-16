import { HStack, VStack, IconButton, Divider, Text } from '@fillmore/ui';
import ProfileImage from '@/components/ProfileImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faPhone,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/hooks/useModal';
import Messenger from '@/components/Messenger';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import type { Trainee } from '@/types/trainee.types';
import { useTrainee } from '@/hooks/useTrainee';
import { useBuddies } from '@/hooks/useBuddies';

interface UserProfileSectionProps {
  user: Trainee;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ user }) => {
  const messengerModal = useModal();
  const { getTraineeById } = useTrainee();
  const { buddyIds } = useBuddies({ userId: user.id });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <HStack gap={20} align="start" fullWidth={true}>
      {/* Profile Image Section */}
      <ProfileImage src={user.profileImageUrl} size={100} />

      {/* User Information Section */}
      <VStack gap={8} align="start" style={{ flex: 1, margin: '0px 12px' }}>
        <HStack gap={8} align="center" justify="space-between" fullWidth={true}>
          <Text as="h1" size={34} weight="bold">
            {formatDisplayName(user.firstName, user.lastName)}
          </Text>
          <HStack gap={4}>
            <div style={{ position: 'relative' }}>
              <IconButton title="Messages" onClick={messengerModal.toggle}>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  size="lg"
                  color="var(--black)"
                />
              </IconButton>
              <Messenger
                isOpen={messengerModal.isOpen}
                onClose={messengerModal.close}
              />
            </div>
            <IconButton title="Call">
              <FontAwesomeIcon icon={faPhone} size="lg" color="var(--black)" />
            </IconButton>
            <IconButton title="Menu">
              <FontAwesomeIcon icon={faBars} size="lg" color="var(--black)" />
            </IconButton>
          </HStack>
        </HStack>

        <VStack gap={4} align="start">
          <HStack gap={8} align="center">
            <Text as="b" size={12} weight="bold" style={{ minWidth: '80px' }}>
              Rank:
            </Text>
            <Text as="span" size={12}>
              {user.rank}
            </Text>
          </HStack>

          <Divider />

          <HStack gap={8} align="center">
            <Text as="b" size={12} weight="bold" style={{ minWidth: '80px' }}>
              Branch:
            </Text>
            <Text as="span" size={12}>
              {user.branch}
            </Text>
          </HStack>

          <Divider />

          <HStack gap={8} align="center">
            <Text as="b" size={12} weight="bold" style={{ minWidth: '80px' }}>
              Background:
            </Text>
            <Text as="span" size={12}>
              {user.background}
            </Text>
          </HStack>

          <Divider />

          <HStack gap={8} align="center" style={{ marginTop: '8px' }}>
            <Text as="b" size={12} weight="bold" style={{ minWidth: '80px' }}>
              Buddies:
            </Text>
            <HStack gap={8} align="center">
              {buddyIds.map((buddyId) => {
                const buddy = getTraineeById(buddyId);

                if (!buddy) return null;

                return (
                  <ProfileImage
                    key={buddy.id}
                    src={buddy.profileImageUrl}
                    size={32}
                    userId={buddy.id}
                    clickable={true}
                  />
                );
              })}
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default UserProfileSection;
