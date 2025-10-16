import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HStack, Text } from '@fillmore/ui';
import arrowLeft from '@/assets/arrow-left.svg';

const UserDetailHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <HStack align="center">
      <img
        src={arrowLeft}
        width={48}
        height={48}
        style={{
          cursor: 'pointer',
        }}
        onClick={handleBackClick}
        alt="Back"
      />
      <Text as="b" size={16} weight="bold">
        Trainee Details
      </Text>
    </HStack>
  );
};

export default UserDetailHeader;
