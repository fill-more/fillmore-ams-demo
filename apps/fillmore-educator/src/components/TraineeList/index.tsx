import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProgressBar, HStack, VStack, Text } from '@fillmore/ui';

import ProfileImage from '@/components/ProfileImage';
import { PATHNAME } from '@/lib/constants';
import { formatDisplayName } from '@/lib/utils/nameUtils';
import type { Trainee } from '@/types/trainee.types';

import S from './styles';

interface TraineeListProps {
  trainees: Trainee[];
  currentUserId?: string;
}

interface TraineeListItemProps {
  trainee: Trainee;
  rank: number;
  isCurrentUser?: boolean;
}

interface TraineeListComponent extends React.FC<TraineeListProps> {
  Item: React.FC<TraineeListItemProps>;
}

const TraineeListItem: React.FC<TraineeListItemProps> = ({
  trainee,
  rank,
  isCurrentUser = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATHNAME.USER_DETAIL.replace(':userId', trainee.id));
  };

  return (
    <S.TraineeListItemWrapper
      isCurrentUser={isCurrentUser}
      onClick={handleClick}
    >
      <Text as="b" size={12} weight="bold">
        {rank}
      </Text>
      <ProfileImage
        src={trainee.profileImageUrl}
        alt={formatDisplayName(trainee.firstName, trainee.lastName)}
        size={32}
        userId={trainee.id}
        clickable={true}
      />
      <VStack>
        <HStack gap={4}>
          <Text as="span" size={12}>
            {trainee.rank}
          </Text>
          <Text as="b" size={12} weight="bold">
            {formatDisplayName(trainee.firstName, trainee.lastName)}
          </Text>
        </HStack>
        <HStack gap={8}>
          <ProgressBar
            percentage={trainee.overallPercentage}
            width={190}
            height={4}
          />
          <Text as="b" size={12} weight="bold">
            {trainee.overallPercentage}%
          </Text>
        </HStack>
      </VStack>
    </S.TraineeListItemWrapper>
  );
};

const TraineeList: TraineeListComponent = ({ trainees, currentUserId }) => {
  return (
    <VStack gap={10}>
      {trainees.map((trainee, index) => (
        <TraineeList.Item
          key={trainee.id}
          trainee={trainee}
          rank={index + 1}
          isCurrentUser={trainee.id === currentUserId}
        />
      ))}
    </VStack>
  );
};

TraineeList.Item = TraineeListItem;

export default TraineeList;
