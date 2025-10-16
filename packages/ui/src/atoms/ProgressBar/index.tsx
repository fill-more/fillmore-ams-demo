import React from 'react';
import S from './styles';

interface ProgressBarProps {
  percentage: number;
  width?: number;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  width = 300,
  height = 4,
}) => {
  return (
    <S.ProgressContainer width={width} height={height}>
      <S.ProgressFill percentage={percentage} />
    </S.ProgressContainer>
  );
};

export default ProgressBar;
