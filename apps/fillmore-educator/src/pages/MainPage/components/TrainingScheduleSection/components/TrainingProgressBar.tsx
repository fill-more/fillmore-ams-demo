import React from 'react';
import { Popover, Text } from '@fillmore/ui';
import S from '../styles';

interface TrainingProgressBarProps {
  percentage: number;
}

const TrainingProgressBar: React.FC<TrainingProgressBarProps> = ({
  percentage,
}) => {
  return (
    <S.ProgressContainer>
      <S.ProgressBar percentage={percentage}>
        <S.PopoverWrapper>
          <Popover isOpen={true} position="top" backgroundColor="var(--black)">
            <Text as="b" size={12} weight="bold" color="var(--white)">
              {percentage}% Ahead
            </Text>
          </Popover>
        </S.PopoverWrapper>
      </S.ProgressBar>
    </S.ProgressContainer>
  );
};

export default TrainingProgressBar;
