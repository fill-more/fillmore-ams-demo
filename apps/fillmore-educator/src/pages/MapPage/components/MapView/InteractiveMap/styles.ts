import styled from '@emotion/styled';

const MapImage = styled.img`
  width: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
  user-select: none;
`;

const RegionTarget = styled.div<{ top: string; left: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  pointer-events: none;
`;

export default {
  MapImage,
  RegionTarget,
};
