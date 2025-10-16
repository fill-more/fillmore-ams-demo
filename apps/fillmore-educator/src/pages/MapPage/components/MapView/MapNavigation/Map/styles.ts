import styled from '@emotion/styled';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ClickableArea = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  transition: all 0.3s ease-out;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  cursor: pointer;

  :hover {
    background-color: #b0d4ff80;
  }
`;

export default {
  MapContainer,
  ClickableArea,
};
