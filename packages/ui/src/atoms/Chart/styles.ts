import styled from '@emotion/styled';

const ChartContainer = styled.div`
  width: 90%;
  height: 100%;
  position: relative;
  align-self: center;
`;

interface GridLineProps {
  position: number;
}

const XAxisLine = styled.div<GridLineProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-image: linear-gradient(to bottom, transparent, var(--dark-gray));
  left: ${({ position }) => position}%;
`;

const YAxisLine = styled.div<GridLineProps>`
  position: absolute;
  left: 0;
  right: -1px;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    var(--dark-gray) 0px,
    var(--dark-gray) 1px,
    transparent 1px,
    transparent 3px
  );
  opacity: ${({ position }) => position / 100};
  top: ${({ position }) => position}%;

  &:last-child {
    background: var(--dark-gray);
  }
`;

const GridContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50px;
  right: 20px;
  bottom: 50px;
`;

const YAxisLabel = styled.p`
  position: absolute;
  left: -20px;
  top: 50%;
  transform: rotate(-90deg) translate(-50%, -50%);

  color: var(--black-50);
  font-size: 10px;
  font-weight: bold;
  line-height: 18px;
`;

const XAxisLabel = styled.p`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translate(-50%, -50%);

  color: var(--black-50);
  font-size: 10px;
  font-weight: bold;
  line-height: 18px;
`;

const XAxisNumber = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);

  color: var(--black-50);
  font-size: 10px;
  font-weight: bold;
  line-height: 18px;
`;

export default {
  ChartContainer,
  GridContainer,
  XAxisLine,
  YAxisLine,
  YAxisLabel,
  XAxisLabel,
  XAxisNumber,
};
