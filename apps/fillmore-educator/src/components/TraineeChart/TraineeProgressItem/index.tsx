import React from 'react';
import { Popover } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrown,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import ProfileImage from '@/components/ProfileImage';
import S from './styles';
import type { Trainee } from '@/types/trainee.types';
import { formatDisplayName } from '@/lib/utils/nameUtils';

interface TraineeProgressItemProps {
  user: Trainee;
  isTopPerformer?: boolean;
  isWorstPerformer?: boolean;
  displayMode?: 'default' | 'featured';
}

const TraineeProgressItem: React.FC<TraineeProgressItemProps> = ({
  user,
  isTopPerformer = false,
  isWorstPerformer = false,
  displayMode = 'default',
}) => {
  const isFeatured = displayMode === 'featured';
  const showPopover = displayMode === 'default';
  const profileSize = isFeatured || isTopPerformer ? 52 : 32;
  return (
    <S.UserProfileContainer position={user.overallPercentage}>
      <ProfileImage
        src={user.profileImageUrl}
        alt={formatDisplayName(user.firstName, user.lastName)}
        size={profileSize}
        borderColor="var(--dark-gray)"
        userId={user.id}
        clickable={true}
      />
      <S.ConnectingLine isTopPerformer={isTopPerformer} />
      <S.ProgressDot />
      {showPopover && isTopPerformer && (
        <Popover isOpen={true} position="top" backgroundColor="var(--blue)">
          <FontAwesomeIcon icon={faCrown} color="var(--white)" />
        </Popover>
      )}
      {showPopover && isWorstPerformer && (
        <Popover isOpen={true} position="top" backgroundColor="var(--red)">
          <FontAwesomeIcon icon={faTriangleExclamation} color="var(--white)" />
        </Popover>
      )}
    </S.UserProfileContainer>
  );
};

export default TraineeProgressItem;
