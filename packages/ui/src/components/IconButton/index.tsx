import React, { useState } from 'react';
import Popover from '../../atoms/Popover';
import loadingIcon from './loading-icon.svg';
import S from './styles';
import { HStack } from '../../atoms/Stack';
import { Spin } from '../../styles/animations';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  title,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return (
      <HStack
        align="center"
        justify="center"
        style={{ width: '32px', height: '32px' }}
      >
        <img
          src={loadingIcon}
          width={24}
          height={24}
          css={{
            animation: `${Spin} 1s linear infinite`,
          }}
        />
      </HStack>
    );
  }

  return (
    <S.Container
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {title && (
        <Popover
          isOpen={isHovered && !disabled}
          position="top"
          backgroundColor="var(--black)"
        >
          <b
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              lineHeight: '16px',
              color: 'var(--white)',
            }}
          >
            {title}
          </b>
        </Popover>
      )}
    </S.Container>
  );
};

export default IconButton;
