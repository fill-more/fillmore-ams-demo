import React from 'react';
import S from './styles';

interface ChartProps {
  xLabel?: string;
  yLabel?: string;
  maxValue?: number;
  gridXLines?: number;
  gridYLines?: number;
  backgroundGraphSrc?: string;
  children?: React.ReactNode;
}

const Chart: React.FC<ChartProps> = ({
  xLabel = '% COMPLETED',
  yLabel = 'TASKS',
  maxValue = 100,
  gridXLines = 5,
  gridYLines = 10,
  backgroundGraphSrc,
  children,
}) => {
  const generateXAxisLines = () => {
    const lines: React.ReactNode[] = [];
    for (let i = 0; i <= gridXLines; i++) {
      const position = (100 / gridXLines) * i;
      const value = (maxValue / gridXLines) * i;
      lines.push(
        <S.XAxisLine key={`x-${i}`} position={position}>
          <S.XAxisNumber>{value}</S.XAxisNumber>
        </S.XAxisLine>
      );
    }
    return lines;
  };

  const generateYAxisLines = () => {
    const lines: React.ReactNode[] = [];
    for (let i = 0; i <= gridYLines; i++) {
      const position = (100 / gridYLines) * i;
      lines.push(<S.YAxisLine key={`y-${i}`} position={position} />);
    }
    return lines;
  };

  return (
    <S.ChartContainer>
      <S.GridContainer>
        {backgroundGraphSrc && (
          <img
            src={backgroundGraphSrc}
            style={{
              position: 'absolute',
              width: 'calc(100% + 10px)',
              left: '-5px',
              right: 0,
              bottom: 0,
            }}
          />
        )}
        <S.YAxisLabel>{yLabel}</S.YAxisLabel>
        <S.XAxisLabel>{xLabel}</S.XAxisLabel>
        {generateXAxisLines()}
        {generateYAxisLines()}
        {children}
      </S.GridContainer>
    </S.ChartContainer>
  );
};

export default Chart;
